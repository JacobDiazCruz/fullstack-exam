import bodyParser from "body-parser";
import cors from "cors";
import { AnyARecord } from "dns";
import express, { Request, Response } from "express";
import mongoose, { Schema } from "mongoose";

const UserProfileSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
  },
  tags: {
    type: [String],
    default: "",
  },
});

const UserProfile = mongoose.model("UserProfile", UserProfileSchema);

export interface IUserProfile {
  _id?: string;
  name: string;
  email: string;
  age?: number;
  tags?: string[];
}

const router = express.Router();

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://carljacobdiazcruz:DkRtY1PdFGrwLgz1@roadmapcluster.xp1n24r.mongodb.net/",
      {}
    );
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

const getAllProfiles = async (req: Request, res: Response) => {
  const profiles = await UserProfile.find().sort({ _id: -1 });
  res.json(profiles);
  return profiles;
};

const getProfileById = async (req: Request, res: Response) => {
  const allProfiles = await getAllProfiles(req, res);
  return allProfiles.find(
    (profile) => profile._id.toString() === req.params.id
  );
};

const createProfile = async (req: Request, res: Response) => {
  try {
    const newProfile = new UserProfile(req.body);
    newProfile.validateSync();
    const profile = await newProfile.save();
    res.json(profile);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

const updateProfile = async (req: Request, res: Response) => {
  try {
    const profile: any = await UserProfile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    for (const key of Object.keys(req.body)) {
      profile[key] = req.body[key];
    }

    await profile.validate();
    await profile.save();
    res.json(profile);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

const deleteProfile = async (req: Request, res: Response) => {
  const profile: any = await getProfileById(req, res);
  await profile.deleteOne();
  return profile;
};

router.get("/", getAllProfiles);
router.get("/:id", getProfileById);
router.post("/", createProfile);
router.put("/:id", updateProfile);
router.delete("/:id", deleteProfile);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

app.use("/api/users", router);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export { UserProfile };
