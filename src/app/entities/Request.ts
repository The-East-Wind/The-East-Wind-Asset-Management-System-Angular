import { Asset } from './Asset';
export class Request {
  requestId: number;
  fromDate: Date;
  toDate: Date;
  status: string;
  requestedBy: object;
  requestedFor: object;
  requestedAsset: Asset;
}
