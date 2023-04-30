export default interface IToolOptions {
  visualizationType?: string;
  visualizationWidth: number;
  visualizationHeight: number;
  visualizationTitle: string;
  visualization?: string;
  scatterPlotOptions: ScatterPlotOptions;
  barPlotOptions: BarPlotOptions;
  histPlotOptions: HistPlotOptions;
  [key: string]:
    | string
    | number
    | HistPlotOptions
    | BarPlotOptions
    | ScatterPlotOptions
    | undefined;
}

interface HistPlotOptions {
  preferredDataColumn: string;
  xAxisLabel: string;
  yAxisLabel: string;
  dataPointColor: string;
}

interface BarPlotOptions {
  preferredXColumn: string;
  preferredYColumn: string;
  xAxisLabel: string;
  yAxisLabel: string;
  dataPointColor: string;
}
interface ScatterPlotOptions {
  preferredXColumn: string;
  preferredYColumn: string;
  xAxisLabel: string;
  yAxisLabel: string;
  dataPointColor: string;
}
