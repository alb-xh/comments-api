import { GraphQLError } from "graphql";

export class BaseError extends GraphQLError {
  constructor (title: string, message?: string) {
    super(message ? `${title}: ${message}` : title);
  }
}

export class BadRequestError extends BaseError {
  constructor (message?: string) {
    super(`BadRequest`, message);
  }
}

export class NotFoundError extends BaseError {
  constructor (message?: string) {
    super(`Not found`, message);
  }
}

export class Forbidden extends BaseError {
  constructor (message?: string) {
    super(`Forbidden`, message)
  }
}

export class InvalidIdError extends BadRequestError {
  constructor (message?: string) {
    super(message ? `Invalid id: ${message}` : 'Invalid id');
  }
}
