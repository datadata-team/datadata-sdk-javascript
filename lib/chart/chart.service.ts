import { BaseService, type PaginatedData } from "../common";
import type { Chart, CreateChartBody, GetChartsParams, UpdateChartBody } from "./chart.interface";

/**
 * Chart 相关 Rest API 接口
 */
export class ChartService extends BaseService {
  /**
   * 分页获取当前用户的 Chart 资源
   */
  public getCharts(params?: GetChartsParams, signal?: AbortSignal) {
    return this.http.get<PaginatedData<Chart>>(`/api/v1/charts`, { params, signal });
  }

  /**
   * 创建 Chart 资源
   */
  public createChart(body: CreateChartBody) {
    return this.http.post<Chart>(`/api/v1/charts`, body);
  }

  /**
   * 获取指定 Chart 资源
   */
  public getChart(id: string, signal?: AbortSignal) {
    return this.http.get<Chart>(`/api/v1/charts/${id}`, { signal });
  }

  /**
   * 更新指定 Chart 资源
   */
  public updateChart(id: string, body: UpdateChartBody) {
    return this.http.put<Chart>(`/api/v1/charts/${id}`, body);
  }

  /**
   * 归档指定 Chart 资源
   */
  public deleteChart(id: string) {
    return this.http.delete<void>(`/api/v1/charts/${id}`);
  }

  /**
   * 分页获取子用户的 Chart 资源，通过 API-Token 中的 UID 区分子用户
   */
  public getSubUserCharts(params?: GetChartsParams, signal?: AbortSignal) {
    return this.http.get<PaginatedData<Chart>>(`/api/v1/charts/by-uid`, { params, signal });
  }

  /**
   * 分页获取指定子用户的 Chart 资源
   */
  public getChartsByUID(uid: string, params?: GetChartsParams, signal?: AbortSignal) {
    return this.http.get<PaginatedData<Chart>>(`/api/v1/charts/uid/${uid}`, { params, signal });
  }
}
