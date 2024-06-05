export type Movement = {
  uuid?: string
  notes?: string
  bedId?: number
  serviceId?: number
  bed?: Bed
  service?: Service
  begin?: Date
  end?: Date
  status: keyof typeof Status
}

export type Bed = {
  bedCode?: string
  bedId?: number
  description?: string
}

export type Service = {
  serviceId?: number
  description?: string
  code?: string
}

export const enum Status {
  PREPARE = 'PREPARE',
  ON_TRANSIT = 'ON_TRANSIT',
  FINISH = 'FINISH',
  CANCELED = 'CANCELED'
}