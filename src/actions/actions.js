export const LOAD_ENTITY = 'LOAD_ENTITY';
export const loadEntity = (id, type, data) => {
  return {
    type: LOAD_ENTITY, id, entityType: type, data
  };
};

export const NEW_QUERY = 'NEW_QUERY';
export const newQuery = (query) => {
  return {
    type: NEW_QUERY, query
  };
};

export const STARTED_FETCHING = 'STARTED_FETCHING';
export const startedFetching = () => {
  return {
    type: STARTED_FETCHING
  };
};

export const FINISHED_FETCHING = 'FINISHED_FETCHING';
export const finishedFetching = () => {
  return {
    type: FINISHED_FETCHING
  };
};

export const FETCHED_PAGE = 'FETCHED_PAGE';
export const fetchedPage = (entity, page, hasNext) => {
  return {
    type: 'FETCHED_PAGE', entity, page,
    nextPage: hasNext ? page+1 : -1,
  };
};
