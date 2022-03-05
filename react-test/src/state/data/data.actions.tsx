import { MostPopularViewedArticlesResponseDto } from "../../models/dtos/mostPopularViewedArticles/mostPopularViewedArticlesResponseDto.model";
import { PeriodOfTimes } from "../../models/internal/types/PeriodOfTimeEnum.model";

export enum DataActions {
    setMostPopularViewedArticles = '@action/setMostPopularViewedArticles',
    unsetMostPopularViewedArticles = '@action/unsetMostPopularViewedArticles'
}

export const setMostPopularViewedArticles = (mostPopularViewedArticles: MostPopularViewedArticlesResponseDto, mostPopularViewedArticlesRequestedPage: PeriodOfTimes) => ({
    type: DataActions.setMostPopularViewedArticles,
    payload: {mostPopularViewedArticles, mostPopularViewedArticlesRequestedPage}
})

export const unsetMostPopularViewedArticles = () => ({
    type: DataActions.setMostPopularViewedArticles,
})