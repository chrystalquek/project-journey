import mongoose from "mongoose";
import faker from "faker";
import _ from "lodash";
import Volunteer, {
  CITIZENSHIP,
  GENDER,
  LEADERSHIP_INTEREST,
  NewVolunteerData,
  RACE,
  SOCIAL_MEDIA_PLATFORM,
  VolunteerData,
} from "../models/Volunteer";
import User, { NewUserData, UserData } from "../models/User";
import Event, { EventData, NewEventData } from "../models/Event";
import SignUp, { NewSignUpData } from "../models/SignUp";
import CommitmentApplication, { NewCommitmentApplicationData } from "../models/CommitmentApplication";


async function seedDB() {
  // Connection URL
  const uri =
    "mongodb+srv://user:user@cluster0.8ap9j.gcp.mongodb.net/user?retryWrites=true&w=majority";
  mongoose.connect(uri, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  try {
    console.log("Connected correctly to server");

    const userCollection = db.collection("users");
    const volunteerCollection = db.collection("volunteers");
    const eventCollection = db.collection("events");
    const signUpCollection = db.collection("signups");
    const commitmentApplicationCollection = db.collection(
      "commitmentapplications"
    );

    // const answerCollection = db.collection("answers")
    // const formCollection = db.collection("forms")
    // const questionCollection = db.collection("questions")
    // const optionCollection = db.collection("options")

    // images

    // delete all data in collections
    const collections = [
      userCollection,
      volunteerCollection,
      eventCollection,
      signUpCollection,
      commitmentApplicationCollection,
    ];
    collections.forEach((element) => {
      element.drop();
    });

    // - MARK: user and volunteer collection
    const essentialVolunteerData: Array<
      Pick<NewVolunteerData, "volunteerType" | "name">
    > = [
      {
        name: "adhoc1",
        volunteerType: "ad-hoc",
      },
      {
        name: "adhoc2",
        volunteerType: "ad-hoc",
      },
      {
        name: "adhoc3",
        volunteerType: "ad-hoc",
      },
      {
        name: "committed1",
        volunteerType: "committed",
      },
      {
        name: "committed2",
        volunteerType: "committed",
      },
      {
        name: "committed3",
        volunteerType: "committed",
      },
      {
        name: "admin1",
        volunteerType: "admin",
      },
      {
        name: "admin2",
        volunteerType: "admin",
      },
    ];

    const users: Array<NewUserData & { createdAt: Date }> = Array.from(
      { length: essentialVolunteerData.length },
      () => ({
        password: "hello123!",
        administratorRemarks: faker.lorem.sentence(),
        createdAt: faker.date.between(
          new Date(2018, 1, 1),
          new Date(2020, 1, 1)
        ),
      })
    );

    const userDocuments = users.map((user) => new User(user));
    await userCollection.insertMany(userDocuments);

    const newUsers: Array<UserData> = await userCollection.find().toArray();

    type NewVolunteerDataSeed = Omit<
      NewVolunteerData & { userId: string },
      | "password"
      | "volunteeringSessionsCount"
      | "workshopsCount"
      | "hangoutsCount"
      | "commitmentApplicationIds"
    > & { createdAt: Date };
    const volunteers: Array<NewVolunteerDataSeed> = _.zipWith(
      essentialVolunteerData,
      newUsers,
      (vol, user) => {
        const volunteer: NewVolunteerDataSeed = {
          ...vol,
          userId: user._id,
          nickname: `${vol.name} nickname`,
          gender: faker.random.arrayElement(GENDER),
          citizenship: faker.random.arrayElement(CITIZENSHIP),
          birthday: faker.date.between(
            new Date(1950, 1, 1),
            new Date(2000, 1, 1)
          ),
          address: faker.address.streetAddress(true),
          mobileNumber: `8${faker.phone.phoneNumber("#######")}`,
          photoUrl: "https://storage.googleapis.com/download/storage/v1/b/journey-storage/o/woman-1625393990543.jpeg?generation=1625393993120164&alt=media",
          email: `${vol.name}@gmail.com`,

          socialMediaPlatform: faker.random.arrayElement(SOCIAL_MEDIA_PLATFORM),

          orgnanization: faker.company.companyName(),
          position: faker.name.jobTitle(),
          race: faker.random.arrayElement(RACE),

          languages: faker.random.arrayElements(
            ["English", "Chinese", "Malay", "Tamil"],
            2
          ),
          referralSources: faker.random.arrayElements(
            ["biab_website", "beyond_facebook", "friend"],
            2
          ),

          hasVolunteered: faker.datatype.boolean(),

          hasVolunteeredExternally: faker.datatype.boolean(),

          hasChildrenExperience: faker.datatype.boolean(),

          sessionsPerMonth: faker.datatype.number(6),
          sessionPreference: faker.lorem.sentence(),

          hasFirstAidCertification: faker.datatype.boolean(),
          leadershipInterest: faker.random.arrayElement(LEADERSHIP_INTEREST),
          interests: faker.lorem.sentence(),

          skills: faker.random.arrayElements(
            [
              "P.R./Marketing",
              "Community Outreach - Helping bring more kids to the programme",
              "Grant Writing/Fundraising",
              "Graphic Design",
            ],
            2
          ),

          personality: `${
            faker.random.arrayElement(["I", "E"]) +
            faker.random.arrayElement(["N", "s"]) +
            faker.random.arrayElement(["F", "T"]) +
            faker.random.arrayElement(["J", "P"])
          }-${faker.random.arrayElement(["A", "T"])}`,
          strengths: Array(3).map(() => faker.random.word()),
          volunteeringOpportunityInterest: faker.lorem.sentence(),

          volunteerReason: faker.lorem.paragraph(),
          volunteerContribution: faker.lorem.sentence(),
          hasCriminalRecord: false,

          // WCA Registration: Medical Information
          hasMedicalNeeds: faker.datatype.boolean(),
          hasAllergies: faker.datatype.boolean(),
          hasMedicationDuringDay: faker.datatype.boolean(),

          // WCA Registration: Emergency Contact
          emergencyContactName: faker.name.findName(),
          emergencyContactNumber: `8${faker.phone.phoneNumber("#######")}`,
          emergencyContactEmail: faker.internet.exampleEmail(),
          emergencyContactRelationship: faker.random.arrayElement([
            "Mother",
            "Father",
          ]),

          // Remarks
          volunteerRemarks: faker.lorem.sentence(),

          createdAt: user.createdAt,
        };

        if (volunteer.socialMediaPlatform === "instagram") {
          volunteer.instagramHandle = faker.internet.userName(volunteer.name);
        }

        if (volunteer.hasVolunteered) {
          volunteer.biabVolunteeringDuration = faker.datatype.number(24);
        }

        if (volunteer.hasVolunteeredExternally) {
          volunteer.volunteeringExperience = faker.lorem.sentence();
        }

        if (volunteer.hasChildrenExperience) {
          volunteer.childrenExperience = faker.lorem.sentence();
        }

        if (volunteer.hasMedicalNeeds) {
          volunteer.medicalNeeds = faker.lorem.sentence();
        }

        if (volunteer.hasAllergies) {
          volunteer.allergies = faker.lorem.sentence();
        }

        return volunteer;
      }
    );

    const volunteerDocuments = volunteers.map((volunteer) => new Volunteer(volunteer));
    await volunteerCollection.insertMany(volunteerDocuments);

    const newVolunteers: Array<VolunteerData> = await volunteerCollection
      .find()
      .toArray();

    const volunteerNamesToIds: {
      adhoc1: string;
      adhoc2: string;
      adhoc3: string;
      committed1: string;
      committed2: string;
      committed3: string;
      admin1: string;
      admin2: string;
    } = Object.assign(
      {},
      ...newVolunteers.map((vol) => ({ [vol.name]: vol._id }))
    );

    // -Mark: event collection
    const essentialEventData: Array<
      Pick<
        NewEventData,
        "name" | "volunteerType" | "eventType" | "startDate" | "roles"
      >
    > = [
      {
        name: "volunteering1",
        volunteerType: "ad-hoc",
        eventType: "volunteering",
        startDate: faker.date.between(
          new Date(2021, 9, 1),
          new Date(2022, 9, 1)
        ),
        roles: [
          {
            name: "photographer",
            description: faker.lorem.sentence(),
            capacity: 2,
            volunteers: [volunteerNamesToIds.adhoc1, volunteerNamesToIds.committed1],
          },
          {
            name: "chef",
            description: faker.lorem.sentence(),
            capacity: 2,
            volunteers: [volunteerNamesToIds.adhoc2],
          },
          {
            name: "driver",
            description: faker.lorem.sentence(),
            capacity: 1,
            volunteers: [],
          },
        ],
      },
      {
        name: "volunteering2",
        volunteerType: "committed",
        eventType: "volunteering",
        startDate: faker.date.between(
          new Date(2020, 2, 1),
          new Date(2021, 7, 1)
        ),
        roles: [
          {
            name: "eventlead",
            description: faker.lorem.sentence(),
            capacity: 1,
            volunteers: [volunteerNamesToIds.committed1],
          },
          {
            name: "social media",
            description: faker.lorem.sentence(),
            capacity: 1,
            volunteers: [volunteerNamesToIds.committed2],
          },
          {
            name: "fundraising",
            description: faker.lorem.sentence(),
            capacity: 1,
            volunteers: [volunteerNamesToIds.committed3],
          },
        ],
      },
      {
        name: "volunteering3",
        volunteerType: "ad-hoc",
        eventType: "volunteering",
        startDate: faker.date.between(
          new Date(2020, 2, 1),
          new Date(2021, 7, 1)
        ),
        roles: [
          {
            name: "eventlead",
            description: faker.lorem.sentence(),
            capacity: 1,
            volunteers: [volunteerNamesToIds.committed1],
          },
          {
            name: "kids",
            description: faker.lorem.sentence(),
            capacity: 2,
            volunteers: [
              volunteerNamesToIds.adhoc3,
              volunteerNamesToIds.committed2,
            ],
          },
          {
            name: "chef",
            description: faker.lorem.sentence(),
            capacity: 1,
            volunteers: [volunteerNamesToIds.committed3],
          },
        ],
      },
      {
        name: "workshop1",
        volunteerType: "ad-hoc",
        eventType: "workshop",
        startDate: faker.date.between(
          new Date(2021, 9, 1),
          new Date(2022, 9, 1)
        ),
        roles: [
          {
            name: "attendee",
            description: faker.lorem.sentence(),
            capacity: 5,
            volunteers: [volunteerNamesToIds.adhoc3],
          },
        ],
      },
      {
        name: "hangout1",
        volunteerType: "committed",
        eventType: "hangout",
        startDate: faker.date.between(
          new Date(2021, 9, 1),
          new Date(2022, 9, 1)
        ),
        roles: [
          {
            name: "attendee",
            description: faker.lorem.sentence(),
            capacity: 2,
            volunteers: [volunteerNamesToIds.committed3],
          },
        ],
      },
    ];

    type NewEventDataSeed = NewEventData & { createdAt?: Date };

    const events: Array<NewEventDataSeed> = essentialEventData.map((eve) => {
      const event: NewEventDataSeed = {
        ...eve,
        coverImage: "https://storage.googleapis.com/download/storage/v1/b/journey-storage/o/people_extend_hand-1625393691729.jpeg?generation=1625393694760151&alt=media",
        endDate: faker.date.soon(7, eve.startDate),
        deadline: faker.date.recent(30, eve.startDate),
        vacancies: eve.roles
          .map((role) => role.capacity)
          .reduce((a, b) => a + b, 0),
        description: faker.lorem.sentence(),
        location: faker.address.secondaryAddress(),
      };

      if (event.eventType === "workshop") {
        event.facilitatorName = faker.name.findName();
        event.facilitatorDescription = faker.lorem.sentence();
        event.facilitatorPhoto = "https://storage.googleapis.com/download/storage/v1/b/journey-storage/o/woman_2-1625394082590.png?generation=1625394085211457&alt=media";
      }

      event.createdAt = faker.date.recent(7, event.deadline);

      return event;
    });

    const eventDocuments = events.map((event) => new Event(event));
    await eventCollection.insertMany(eventDocuments);

    const newEvents: Array<EventData> = await eventCollection.find().toArray();

    const eventNamesToIds: {
      volunteering1: string;
      volunteering2: string;
      volunteering3: string;
      workshop1: string;
      hangout1: string;
    } = Object.assign(
      {},
      ...newEvents.map((event) => ({ [event.name]: event._id }))
    );

    // -Mark: signup collection

    // rejected or pending sign ups
    const essentialSignUpData: Array<
      Pick<NewSignUpData, "status" | "userId" | "eventId">
    > = [
      {
        status: "rejected",
        userId: volunteerNamesToIds.adhoc3,
        eventId: eventNamesToIds.volunteering1,
      },
      {
        status: "pending",
        userId: volunteerNamesToIds.committed2,
        eventId: eventNamesToIds.volunteering1,
      },
      {
        status: "pending",
        userId: volunteerNamesToIds.adhoc2,
        eventId: eventNamesToIds.volunteering3,
      },
    ];

    type NewSignUpDataSeed = NewSignUpData & { createdAt: Date };

    const signUps: Array<NewSignUpDataSeed> = essentialSignUpData.map((sUp) => {
      const event = newEvents.find((eve) => eve._id === sUp.eventId);

      if (!event) {
        throw new Error("No corresponding event");
      }
      const signUp: NewSignUpDataSeed = {
        ...sUp,
        preferences: faker.helpers.shuffle(
          event.roles.map((role) => role.name)
        ),
        isRestricted: false,
        createdAt: faker.date.between(event.createdAt, event.deadline),
      };

      return signUp;
    });

    // add approved signups
    for (let i = 0; i < newEvents.length; i += 1) {
      const event = newEvents[i];
      const { roles } = event;
      for (let j = 0; j < roles.length; j += 1) {
        const role = roles[j];
        const roleNames = roles.map((r) => r.name);
        const roleVolunteers = role.volunteers;
        for (let k = 0; k < roleVolunteers.length; k += 1) {
          const signUp: NewSignUpDataSeed = {
            eventId: event._id,
            userId: roleVolunteers[k],
            status: "accepted",
            acceptedRole: role.name,
            preferences: faker.helpers.shuffle(roleNames),
            isRestricted: false,
            createdAt: faker.date.between(event.createdAt, event.deadline),
          };
          signUps.push(signUp);
        }
      }
    }

    const signUpDocuments = signUps.map((signUp) => new SignUp(signUp));
    await signUpCollection.insertMany(signUpDocuments);

    // -Mark: CommitmentApplication collection
    const essentialCommitmentApplicationData: Array<
      Pick<NewCommitmentApplicationData, "volunteerId" | "status">
    > = [
      {
        volunteerId: volunteerNamesToIds.adhoc1,
        status: "pending",
      },
      {
        volunteerId: volunteerNamesToIds.adhoc3,
        status: "rejected",
      },
      {
        volunteerId: volunteerNamesToIds.committed1,
        status: "accepted",
      },
      {
        volunteerId: volunteerNamesToIds.committed2,
        status: "accepted",
      },
    ];

    type NewCommitmentApplicationDataSeed = NewCommitmentApplicationData & {
      createdAt: Date;
    };

    const commitmentApplications: Array<NewCommitmentApplicationDataSeed> =
      essentialCommitmentApplicationData.map((comApp) => {
        const volunteer = newVolunteers.find(
          (vol) => vol._id === comApp.volunteerId
        );

        if (!volunteer) {
          throw new Error(
            "No corresponding volunteer for commitment application"
          );
        }

        const commitmentApplication: NewCommitmentApplicationDataSeed = {
          ...comApp,
          createdAt: faker.date.between(
            volunteer.createdAt,
            new Date(2020, 2, 1)
          ),
        };

        return commitmentApplication;
      });

    const commitmentApplicationDocuments = commitmentApplications.map((commitmentApplication) => new CommitmentApplication(commitmentApplication));
    await commitmentApplicationCollection.insertMany(commitmentApplicationDocuments);

    console.log("Database seeded! :)");
    db.close();
  } catch (err) {
    console.log(err.stack);
  }
}
seedDB().then(() => process.exit());
