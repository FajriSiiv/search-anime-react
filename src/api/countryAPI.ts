const BASE_URL = "https://restcountries.com/v3.1";

export const getAllCountries = async () => {
  const response = await fetch(`${BASE_URL}/all`);
  if (!response.ok) {
    throw new Error("Failed to fetch countries");
  }
  return await response.json();
};

export const getCountryByName = async (name: string) => {
  const response = await fetch(`${BASE_URL}/all/name/${name}`);
  if (!response.ok) {
    throw new Error("Failed to fetch countries");
  }
  return await response.json();
};

export async function getFirstImage() {
  const url = "https://unsplash.com/s/photos/indonesia";

  try {
    // Fetch the HTML of the Unsplash search results page
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "text/html",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    // Check if the response is okay
    if (!response.ok) throw new Error("Network response was not ok");

    const html = await response.text();

    // Create a DOM parser to parse the HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Get the first image element
    const firstImage = doc.querySelector("img"); // Selects the first <img> tag

    // Get the source URL of the first image
    if (firstImage) {
      const imageUrl = firstImage.src;
      console.log("First Image URL:", imageUrl);
      return imageUrl; // Return or use the image URL as needed
    } else {
      console.log("No images found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching image:", error);
  }
}

// Call the function
