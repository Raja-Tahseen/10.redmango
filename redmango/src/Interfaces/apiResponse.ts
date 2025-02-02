export default interface apiResponse {
  data?: {
    //this will be included in the suggestions by typescipt so if possible use the format if you know that
    statusCode?: number;
    isSuccess?: boolean;
    errorMessages?: Array<string>;
    result: {
      // typescript will not give suggestions
      [key: string]: string;
    };
  };
  error?: any;
}
