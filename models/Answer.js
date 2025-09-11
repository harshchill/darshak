import mongoose from 'mongoose';

const SkillRatingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, min: 0, max: 5, required: true },
    proof: { type: String, trim: true },
  },
  { _id: false }
);

const AnswerSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },

    // Past actions
    pastProject: { type: String, trim: true },

    // Preference + constraints
    workPreference: { type: String, enum: ['remote', 'hybrid', 'onsite'], required: true },
    cityConstraints: { type: [String], default: [] },

    // Skill self-assess (freeform + structured)
    confidentSkills: { type: [String], default: [] },
    skillRatings: { type: [SkillRatingSchema], default: [] },

    // Values
    values: {
      type: [String],
      enum: ['learning', 'salary', 'stability', 'leadership', 'solving_problems'],
      default: [],
    },

    // Future vision
    futureVision: { type: String, trim: true },

    // Sample list answers
    proudProject: { type: String, trim: true },
    enjoyedSubjects: { type: String, trim: true },
  },
  { timestamps: true }
);

const Answer = mongoose.models.Answer || mongoose.model('Answer', AnswerSchema);

export default Answer;


