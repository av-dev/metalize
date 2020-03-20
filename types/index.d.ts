/**
 * Copyright (c) 2019-present Andrew Vereshchak
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

declare type Dialect = 'postgres' | 'mysql'

interface MetalizeOptions {
  dialect: Dialect,
  connectionConfig?: Object,
  client?: Object
}

interface Reference {
  table: string,
  columns: string[],
}

declare type ActionType = 'CASCADE' | 'RESTRICT' | 'NO ACTION'

interface ForeignKey {
  name: String
  columns: string[]
  match: 'FULL' | 'PARTIAL' | 'SIMPLE',
  onDelete: ActionType,
  onUpdate: ActionType,
  references: Reference
}

interface IdentityMetadata extends SequenceMetadata {
  generation: 'ALWAYS' | 'BY DEFAULT'
}

interface Column {
  name: string,
  type: string,
  nullable: boolean,
  default:  string,
  identity?: IdentityMetadata,
}

interface Index {
  name: String,
  columns: string[],
}

interface SequenceMetadata {
  start: string,
  min: string,
  max: string,
  increment: string,
  cycle: boolean,
}

interface Check {
  name: String,
  condition: string
}

interface TableMetadata {
  columns: Column[],
  primaryKey: Index,
  unique: Index[],
  indexes: Index[],
  foreignKeys: ForeignKey[],
  checks: Check[]
}

interface ReadOptions {
  tables?: string[],
  sequences?: string[],
}

interface ReadResult {
  // @ts-ignore
  tables: Map<string, TableMetadata | undefined>,
  // @ts-ignore
  sequences: Map<string, SequenceMetadata | undefined>,
}

declare class Metalize {
  constructor(options: MetalizeOptions);

  read(options: ReadOptions): Promise<ReadResult>;

  end(): Promise<void>
}

export = Metalize;
