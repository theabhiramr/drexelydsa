import { useEffect, useState } from "react";
import { fetchFromWorker } from "../lib/actionNetwork";

export default function Events() {
    const [events, setEvents] = useState([]);
