// Import the NFTStorage class and File constructor from the 'nft.storage' package
// This is a ipfs pinning service that allows you to upload files to ipfs and pin them
import { NFTStorage, File } from "nft.storage";
import mime from "mime";

// Create a new instance of the NFTStorage client
// Replace this with your own API key
// You can get one by signing up for a free account at https://nft.storage
const NFT_STORAGE_KEY = "YOUR_API_KEY";
const client = new NFTStorage({ token: NFT_STORAGE_KEY });

// form element
const form = document.querySelector("form");
// hash element
const hash = document.querySelector("#hash");
// url element
const url = document.querySelector("#url");

// Listen for the form submission
form.addEventListener("submit", async (event) => {
  // Prevent the default form submission
  event.preventDefault();
  // disable the form submit button
  // just to make sure no one uploads the same file twice
  form.elements[1].disabled = true;

  // Get the file from the input element
  const file = form.elements[0].files[0];
  // Upload the file to NFT.Storage and receive the CID
  const cid = await client.storeBlob(
    new File([file], file.name, { type: file.type })
  );
  console.log(cid);
  // Set the hash element's text content to the CID
  hash.innerHTML = cid.toString();
  // Set the url element's href attribute to the URL of the CID
  // create an anchor tag and set the href to the url
  url.innerHTML = `<a href="https://${cid.toString()}.ipfs.nftstorage.link">https://${cid.toString()}.ipfs.nftstorage.link</a>`;

  // enable the form submit button
  form.elements[1].disabled = false;
});

// async function uploadFileUsingURL() {
//   const fileURL = "https://file.jpg";
//   const metadata = JSON.stringify({
//     name: "file.jpg",
//     description: "file description",
//     image: fileURL,
//   });
//   const file = new File([metadata], "metadata.json", {
//     type: mime.getType("jpg"),
//   });
//   const cid = await client.storeBlob(file);
//   console.log(cid);
// }
