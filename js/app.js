// ===== APPWRITE INIT =====
const client = new Appwrite.Client()
  .setEndpoint("YOUR_APPWRITE_ENDPOINT")
  .setProject("YOUR_PROJECT_ID");

const account = new Appwrite.Account(client);
const databases = new Appwrite.Databases(client);
const storage = new Appwrite.Storage(client);

// ===== IDS =====
const DATABASE_ID = "YOUR_DATABASE_ID";
const TABLE_ID = "YOUR_COLLECTION_ID";
const BUCKET_ID = "YOUR_BUCKET_ID";

// ===== REGISTER =====
async function register() {
  try {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    await account.create(
      Appwrite.ID.unique(),
      email,
      password
    );

    const msg = document.getElementById("msg");
    if (msg) msg.innerText = "✅ Registered successfully. Now login.";

  } catch (err) {
    alert(err.message);
  }
}

// ===== LOGIN =====
async function login() {
  try {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    await account.createEmailSession(email, password);
    window.location.href = "dashboard.html";

  } catch (err) {
    alert(err.message);
  }
}

// ===== CHECK LOGIN =====
async function checkLogin() {
  try {
    await account.get();
  } catch {
    window.location.href = "index.html";
  }
}

// ===== PROTECTED PAGES =====
const protectedPages = ["dashboard.html", "gallery.html", "success.html"];
if (protectedPages.some(p => location.pathname.includes(p))) {
  checkLogin();
}

// ===== LOAD USER INFO =====
async function loadUser() {
  try {
    const user = await account.get();
    const el = document.getElementById("userEmail");
    if (el) el.innerText = `Logged in as: ${user.email}`;
  } catch { }
}

if (location.pathname.includes("dashboard.html")) {
  loadUser();
}

// ===== LOGOUT =====
async function logout() {
  await account.deleteSession("current");
  window.location.href = "index.html";
}

// ===== UPLOAD IMAGE =====
async function uploadImage() {
  try {
    const fileInput = document.getElementById("photo");
    const titleInput = document.getElementById("title");

    const file = fileInput.files[0];
    const title = titleInput.value.trim();

    if (!file || !title) {
      alert("Please select a photo and enter a title");
      return;
    }

    const user = await account.get();

    // Upload to storage
    const uploaded = await storage.createFile(
      BUCKET_ID,
      Appwrite.ID.unique(),
      file
    );

    // Save to database
    await databases.createDocument(
      DATABASE_ID,
      TABLE_ID,
      Appwrite.ID.unique(),
      {
        Name: title,
        imageId: uploaded.$id,
        userId: user.$id
      },
      [
        Appwrite.Permission.read(Appwrite.Role.user(user.$id)),
        Appwrite.Permission.update(Appwrite.Role.user(user.$id)),
        Appwrite.Permission.delete(Appwrite.Role.user(user.$id))
      ]
    );


    // ✅ SUCCESS POPUP
    alert("✅ Photo uploaded successfully");

    // Reset inputs
    fileInput.value = "";
    titleInput.value = "";

    // Refresh gallery
    fetchImages();

  } catch (err) {
    alert("❌ Upload failed: " + err.message);
  }
}

// ===== FETCH USER PHOTOS =====
async function fetchImages() {
  try {
    const user = await account.get();
    const gallery = document.getElementById("gallery");
    if (!gallery) return;

    const res = await databases.listDocuments(
      DATABASE_ID,
      TABLE_ID,
      [Appwrite.Query.equal("userId", user.$id)]
    );

    gallery.innerHTML = "";

    res.documents.forEach(doc => {
      const url = storage.getFileView(BUCKET_ID, doc.imageId).href;
      gallery.innerHTML += `
        <div style="display:inline-block;margin:10px">
          <img src="${url}" width="150"><br>
          <b>${doc.Name}</b>
        </div>
      `;
    });

  } catch (err) {
    console.error(err);
  }
}

// ===== EVENTS =====
document.addEventListener("DOMContentLoaded", () => {

  const registerBtn = document.getElementById("registerBtn");
  const loginBtn = document.getElementById("loginBtn");
  const uploadBtn = document.getElementById("uploadBtn");

  if (registerBtn) {
    registerBtn.addEventListener("click", register);
  }

  if (loginBtn) {
    loginBtn.addEventListener("click", login);
  }

  if (uploadBtn) {
    uploadBtn.addEventListener("click", uploadImage);
    fetchImages();
  }
});
