export default interface IToolOptions {
  visualizationType?: string;
  visualizationTitle?: string;
  scatterPlotOptions?: {
    preferredXColumn?: string;
    preferredYColumn?: string;
    xAxisLabel?: string;
    yAxisLabel?: string;
  };
}
