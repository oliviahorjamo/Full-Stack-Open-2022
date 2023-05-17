
export interface CoursePartBase {
  name: string,
  exerciseCount: number
}

export interface CoursePartBaseWithDescription extends CoursePartBase {
  description: string
}

export interface CoursePartBasic extends CoursePartBaseWithDescription {
  kind: "basic" // a literal type: a hardcoded string that allows using different types in a list
}

// this type of narrowing down the type is called discriminated union

export interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number,
  kind: "group"
}

export interface CoursePartBackground extends CoursePartBaseWithDescription {
  backgroundMaterial: string,
  kind: "background"
}

export interface CoursePartRequirements extends CoursePartBaseWithDescription {
  requirements: string[],
  kind: "special"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartRequirements
