import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

// Extend dayjs with plugins
dayjs.extend(advancedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

const tz = "America/New_York";

dayjs.tz.setDefault(tz);

export default dayjs;
