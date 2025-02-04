import { createGeneratorStrByTemplate } from 'architect-project';

export const genCode = createGeneratorStrByTemplate({ itrStart: '->', itrEnd: '<-' });

export const requestAxiosTemplate = `
// ## ->methodCaps<- ->path<- ##

export type ->methodParametersType<- = {
  ->paramsType<-
}

/**
* ->methodCaps<- ->path<- 
* */ 
export const ->methodName<- = ({
  ->params<-
}: ->methodParametersType<-): ->responseType<- => {
  return axios.->method<-(->requestArguments<-)
}` as const;
