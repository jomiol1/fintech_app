export interface IResponse<T>{
  statusCode: number;
  message: string;
  data: T;
}

export interface IPersonResponse extends IPersonRequest{
    id: number;
  }

  export interface IPersonRequest {
    name: string;
    lastName: string;
    gender: string;
    creditCard: ICreditCard;
  }

export interface ICreditCard {
  number:string;
  cvv:string;
  year:string;
  month:string;

}




