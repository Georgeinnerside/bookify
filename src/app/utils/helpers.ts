
// function to modify image resolution
export default function getHighResImage(imageURL: string): string {
  return imageURL
    ? imageURL.replace("zoom=1", "zoom=3")
    : "https://via.placeholder.com/150x220?text=No+Image";
}


// truncate text
export function truncDescription(description: string, maxLength: 200): string {
  if (!description) return "No Description";

  description.length > maxLength
    ? description.slice(0, 300).trim() + "..."
    : description;
  return description;
}

export function upperCaseAtuhor(text: string) {
  if (!text || text.trim() === "") return "Unknown Author";
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export const shortenText = (text: string, wordLimit: number) => {
  const words = text.split(" ");
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(" ") + "...";
};

export function removeHTML(html: string): string {
  if (!html) return "No description available";
  return html.replace(/<[^>]*>?/gm, "").trim();
}
