
export enum ENUM_TIPO_DE_COMPONETES{
    NINGUNO = "",
    BUTTON_GROUP = "buttonGroup",
    SELECT = "select",
    MULTI_SELECT = "multi-select",
    CHECK_SHADOW = "checkShadow",
    FILTER_CHECK_WITH_SEARCH ="filter-checks-with-search",
    BAR_CHART="bar-chart",
    BAR_VERTICAL_CHART="bar-vertical-chart",
    PIE_CHART="pie-chart",
    DONUT_CHART="donut-chart",
    LINE_CHART="line-chart",
    BUTTON="button-spartan",
    INFORMATION_CARD_SIMPLE="information-card-simple",
    INFORMATION_CARD_WITH_CHART="information-card-with-chart",
    INFORMATION_CARD_WITH_CHART_DONUT="information-card-with-chart-donut",
    INFORMATION_CARD_WITH_CHART_DONUT_KENDO="information-card-with-chart-donut-kendo",
    MAP_WITH_BUBLES="map-with-bubles",
    MAP_WITH_MARKERS="map-with-markers"
}

export enum ENUM_SECCIONES_LAYOUT {
    VIEW='view',
    FILTERS='filters',
    BODY='body'
}

export const CHARTS_KENDO_MAPPER = {
    [ENUM_TIPO_DE_COMPONETES.BAR_CHART] : 'bar',
}

export const TYPE_CHARTS = [
    ENUM_TIPO_DE_COMPONETES.BAR_CHART,
    ENUM_TIPO_DE_COMPONETES.DONUT_CHART,
    ENUM_TIPO_DE_COMPONETES.LINE_CHART,
    ENUM_TIPO_DE_COMPONETES.PIE_CHART,
    ENUM_TIPO_DE_COMPONETES.MAP_WITH_BUBLES,
    ENUM_TIPO_DE_COMPONETES.MAP_WITH_MARKERS,
]
