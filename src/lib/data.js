import data from "./rowData.json";
import axios from "axios";
const baseURL = "https://free-to-play-games-database.p.rapidapi.com/api";
const baseOption = {
  method: "GET",
  url: `${baseURL}/games`,
  headers: {
    "x-rapidapi-key": "58a618110emsh629510e70b33774p10020bjsn2c92818a1843",
    "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
  },
};
const allGames = data;

const fetshAllData = async () => {
  const options = baseOption;
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getPlatforms = () => {
  return [...new Set(data.map((item) => item.platform))];
};

const fetchPlatforms = async () => {
  try {
    const data = await fetshAllData();
    console.log(data);
    return [...new Set(data.map((item) => item.platform))];
  } catch (error) {
    console.log(error);
  }
};
// return  ['PC (Windows)', 'Web Browser', 'PC (Windows), Web Browser']

// accept  'bc', 'browser'
const getGamesByplatform = (platform) => {
  const result = data.filter(
    (item) =>
      item.platform.split(" ")[0].toLowerCase() == platform.toLowerCase()
  );
  return result;
};
const fetshGamesByplatFrorm = async (platform = "pc") => {
  const options = {
    ...baseOption,
    params: { platform },
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const fetshGameDetails = async (id) => {
  const options = {
    ...baseOption,
    url: `${baseURL}/game`,
    params: { id },
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

//  tag 3d.mmorpg.fantasy.pvp   must be (DOT) "."  platform is optional ["browser","pc"]
const fetshGamesByTags = async (tag, platform) => {
  const options = {
    ...baseOption,
    url: `${baseURL}/filter`,
    params: {
      tag,
      ...(platform && { platform }),
    },
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
const fetshSortCartigorySortBy = async (platform, category, sortby) => {
  const options = {
    ...baseOption,
    params: {
      platform,
      category,
      "sort-by": sortby,
    },
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export {
  allGames,
  getPlatforms,
  getGamesByplatform,
  fetchPlatforms,
  fetshAllData,
  fetshGamesByplatFrorm,
  fetshGameDetails,
  fetshGamesByTags,
  fetshSortCartigorySortBy,
};
