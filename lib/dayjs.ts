import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

// Extend dayjs with plugins
dayjs.extend(advancedFormat);

export default dayjs;
