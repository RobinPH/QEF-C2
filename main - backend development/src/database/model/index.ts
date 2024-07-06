import _AnalystModel from "./AnalystModel";
import _AnswerModel from "./AnswerModel";
import _QuestionModel from "./QuestionModel";
import _StudentModel from "./StudentModel";
import _StudentSubjectModel from "./StudentSubjectModel";
import _SubjectModel from "./SubjectModel";
import _TeacherModel from "./TeacherModel";
import _UserModel from "./UserModel";

// const MODELS = {
//   answer: new _AnswerModel(),
//   question: new _QuestionModel(),
//   student: new _StudentModel(),
//   subject: new _SubjectModel(),
//   user: new _UserModel(),
//   studentSubject: new _StudentSubjectModel(),
// } as const;

// export function useModel<Entity extends keyof typeof MODELS>(entity: Entity) {
//   return MODELS[entity];
// }

export const UserModel = new _UserModel();
export const StudentModel = new _StudentModel();
export const TeacherModel = new _TeacherModel();
export const AnalystModel = new _AnalystModel();
export const AnswerModel = new _AnswerModel();
export const QuestionModel = new _QuestionModel();
export const SubjectModel = new _SubjectModel();
export const StudentSubjectModel = new _StudentSubjectModel();
