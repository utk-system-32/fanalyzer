export default interface IToolOptions {
  visualizationType?: string;
  visualizationTitle?: string;
  scatterPlotOptions?: {
    preferredXColumn?: string;
    preferredYColumn?: string;
    preferredXTickLabelsColumn?: string;
    preferredYTickLabelsColumn?: string;
    xAxisLabel?: string;
    yAxisLabel?: string;
  };
}
