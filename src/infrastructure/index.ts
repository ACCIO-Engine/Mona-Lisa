import { search } from "./services/search";
import { getHighlights } from "./services/highlights.ts";
import {
  getDirs,
  insertDirs,
  insertIgnoreDirs,
  removeDirs,
  removeIgnoreDirs
} from "./services/crawler";

export {
  search,
  getHighlights as getHighlightsService,
  getDirs,
  insertDirs,
  insertIgnoreDirs,
  removeDirs,
  removeIgnoreDirs
};