export default interface IToolOptions {
  visualizationType?: string;
  visualizationWidth?: number;
  visualizationHeight?: number;
  visualizationTitle?: string;
  visualization: string;
  scatterPlotOptions?: {
    preferredXColumn?: string;
    preferredYColumn?: string;
    xAxisLabel?: string;
    yAxisLabel?: string;
    dataPointColor: string;
  };
}
