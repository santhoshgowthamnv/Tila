import { scaledSize } from "../../../helpers/utils"

const commonStyles = {
    fontSize_12: scaledSize(12),
    fontSize_14: scaledSize(14),
    fontSize_16: scaledSize(16),
    fontSize_18: scaledSize(18),
    fontWeight_bold: "bold",
    center: "center",
    space_between: "space-between",
    row: "row",
    left: "left",
    right: "right",
    px_5: scaledSize(5),
    flex_1: 1,
    flex_2: 2
};

const commonColors = {
    color_black: "black",
    color_white: "white",
    color_strong_blue: "#176DC2",
    color_grey_03: "rgba(59,59,59,0.3)",
    color_grey_05: "rgba(59,59,59,0.5)",
    color_grey_02: "rgba(0,0,0,0.2)",
    transparent_black: "rgba(0,0,0, 0.9)",
    color_grey: "grey",
    color_grey_hex: "#CCCCCC",
    color_dark_grey: "#9B9B9B",
    color_orange: "orange",
    color_red: "red",
    color_green: "green",
    color_primary_orange: "#FF6600",
    color_aliceblue: "aliceblue",
}

export { commonStyles, commonColors }