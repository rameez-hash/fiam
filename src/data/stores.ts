export type Store = {
  name: string;
  address: string;
  phones: string[];
};

export type CityStores = {
  city: string;
  stores: Store[];
};

export const storeContact = {
  email: "info@fiam.com.pk",
  altEmail: "info@fiamlights.com.pk",
  phone: "+92 321 8208116",
  phoneTel: "+923218208116",
};

/** Recovered from the former fiam.com.pk/stores page */
export const storeCities: CityStores[] = [
  {
    city: "Karachi",
    stores: [
      {
        name: "GLOW Illuminating Ideas",
        address: "Shop No. 3/4, Parsa Classic, Block 9, Clifton",
        phones: ["0321-8208116"],
      },
      {
        name: "Glow Home",
        address: "No. 92-C, Al-Murtaza Commercial Ln 1, D.H.A. Phase 8",
        phones: ["0321-8208116"],
      },
      {
        name: "Rana Lights",
        address: "6 Electric Centre, Denso Hall, Karachi",
        phones: ["021-3242-0351"],
      },
    ],
  },
  {
    city: "Lahore",
    stores: [
      {
        name: "Aashiyana",
        address: "13-C1 College Road",
        phones: ["042-35242002"],
      },
      {
        name: "Aashiyana Lights DHA",
        address: "Main Boulevard, DHA Lahore Cantt",
        phones: ["042-36666650", "042-36666651"],
      },
      {
        name: "Aashiyana Lights",
        address: "2-A Beadon Road",
        phones: ["042-37356088"],
      },
    ],
  },
  {
    city: "Islamabad",
    stores: [
      {
        name: "Islamabad Lights",
        address: "10-11, Block #89, Bilal Area, Blue Plaza",
        phones: ["051-2150070"],
      },
      {
        name: "Islamabad Lights",
        address: "Plot #20, G.T. Road, DHA II (Next to GIGA Mall), Phase Street 2, opposite Kale",
        phones: ["051-6103088"],
      },
      {
        name: "Master Electric and Fancy Lights",
        address: "Shop # 8/9, Jan Plaza, Opp. DHA Phase II, Gate #2, G.T. Road",
        phones: ["051-5709258"],
      },
    ],
  },
  {
    city: "Multan",
    stores: [
      {
        name: "Crystal Lights",
        address: "Chungi #9, Near Food Street and Khana Farhang Iran, Khanewal Road",
        phones: ["061-6220164"],
      },
    ],
  },
  {
    city: "Faisalabad",
    stores: [
      {
        name: "Roshni Lights",
        address: "S-10, Susan Road, Hockey Stadium, Main Susan Road",
        phones: ["041-8543495", "041-8715284"],
      },
    ],
  },
  {
    city: "Peshawar",
    stores: [
      {
        name: "Light Palace",
        address: "Phase 3 Chowk, near Bab-e-Peshawar flyover, Jamrod Road, Peshawar",
        phones: ["091-5612209", "0346-9187267", "0345-9445601"],
      },
    ],
  },
  {
    city: "Rawalpindi",
    stores: [
      {
        name: "Rawal Lights",
        address: "Al-Harmain Plaza, Shop 2, Murree Rd, Faizabad, Shamsabad",
        phones: ["051-4575893"],
      },
    ],
  },
  {
    city: "Hyderabad",
    stores: [
      {
        name: "Bilal Lights",
        address: "Old Police Shopping Centre, Shop No. 10",
        phones: ["0336-3974758", "0334-3297590"],
      },
    ],
  },
];
