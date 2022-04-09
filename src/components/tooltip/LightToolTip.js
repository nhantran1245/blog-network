import { Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/core";

export default withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
  },
}))(Tooltip);
