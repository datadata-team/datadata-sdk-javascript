export interface Chart {
  id: string;
  name: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  description?: string;
  datasetQuery: DatasetQuery;
  visualizationSettings: any;
}

export interface DatasetQuery {
  type: "native";
  native: {
    query: string;
  };
  dataSourceId: string;
}

export type GetChartsParams = {
  tag?: Array<string>;
  sort?: "name:asc" | "name:desc" | "create_at:asc" | "create_at:desc" | "updated_at:asc" | "updated_at:desc";
  limit?: number;
  offset?: number;
  keyword?: string;
  archived?: boolean;
};

export type CreateChartBody = Pick<Chart, "name" | "description" | "datasetQuery" | "visualizationSettings">;

export type UpdateChartBody = Pick<Chart, "name" | "description" | "datasetQuery" | "visualizationSettings">;
