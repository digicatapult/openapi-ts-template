export interface Health {
  get: (req: any) => Promise<any>
}