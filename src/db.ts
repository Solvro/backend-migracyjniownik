import postgres from "postgres";
import { DB_V2_URI, DB_V3_URI } from "./variables.js";

export const sql_v2 = postgres(DB_V2_URI);
export const sql_v3 = postgres(DB_V3_URI);
