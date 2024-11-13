import { ReactNode } from 'react'

export interface playerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export interface matchInfoProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export interface playerInfoProps {
  [key: string]: Record<string, any> | boolean | number | string
}
