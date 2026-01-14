import { useEffect, useState } from "react";
import Papa from "papaparse";

// Avatar assets
import female1 from "./assets/female1.svg";
import female2 from "./assets/female2.svg";
import male3 from "./assets/male3.svg";
import male2 from "./assets/male2.svg";

// Fixed avatar mapping (MATCHES normalized values)
const AVATAR_BY_TITLE = {
  ms: female1,
  mrs: female2,
  mr: male3,
  dr: male2,
};

// Avatar pool (random fallback for unknown titles)
const AVATAR_POOL = [female1, female2, male3, male2];

// Random avatar helper
const getRandomAvatar = () => {
  const randomIndex = Math.floor(Math.random() * AVATAR_POOL.length);
  return AVATAR_POOL[randomIndex];
};

// Avatar selector (STATIC if matched, RANDOM if not)
const getAvatarByTitle = (title) => {
  // Empty title → random avatar
  if (!title) {
    console.log("NO TITLE → RANDOM AVATAR");
    return getRandomAvatar();
  }

  const normalized = String(title)
    .trim()
    .toLowerCase()
    .replace(/\./g, "")
    .split(" ")[0];

  console.log("TITLE:", title, "→ NORMALIZED:", normalized);
  console.log("AVATAR FOUND:", AVATAR_BY_TITLE[normalized]);

  // Known title → static avatar
  if (AVATAR_BY_TITLE[normalized]) {
    return AVATAR_BY_TITLE[normalized];
  }

  // Unknown title → random avatar
  console.log("UNKNOWN TITLE → RANDOM AVATAR");
  return getRandomAvatar();
};

export function useTestimonials() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const SHEET_URL =
      "https://docs.google.com/spreadsheets/d/1OcQt_Grh2MePL9amlriy3CCQSrzYTt721CFkZ6WHizQ/export?format=csv&gid=496488766";

    Papa.parse(SHEET_URL, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const allKeys =
          results.data.length > 0 ? Object.keys(results.data[0]) : [];

        const permissionKey = allKeys.find((k) =>
          k.toLowerCase().includes("permission") 
        );
        // const usabilityKey = allKeys.find((k) =>
        //   k.toLowerCase().includes("usability")
        // );
        // const usageKey = allKeys.find((k) =>
        //   k.toLowerCase().includes("usage")
        // );
        const commentKey = allKeys.find((k) =>
  k.toLowerCase().includes("comment on the value")
);

        const userTitleKey = allKeys.find((k) =>
          k.toLowerCase().includes("addressed") ///mr.ms.mrs.other
        );
        const ratingKey = allKeys.find((k) =>
          k.toLowerCase().includes("how likely are you to recommend") // Rating (Column C) 
        );

        const mapped = results.data
          .filter((row) => {
            const val = row[permissionKey]?.toLowerCase() || "";
            return val.includes("yes");
          })
          .map((row, index) => ({
            id: index + 1,
            name: row["Name"]?.trim() || "Anonymous",

            // ✅ FINAL avatar logic
            avatar: getAvatarByTitle(row[userTitleKey]),

            rating: Number(row[ratingKey]) || 5,
          //   message: [row[usabilityKey], row[usageKey]]
          //     .filter(Boolean)
          //     .join(", "),
          // }));
              message: row[commentKey]?.trim() || "",
  }));

        console.log("FINAL MAPPED TESTIMONIALS:", mapped);
        setData(mapped);
      },
      error: (err) => console.error("CSV ERROR:", err),
    });
  }, []);

  return data;
}
