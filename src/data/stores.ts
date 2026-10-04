export type Store = {
  name: string;
  address: string;
  phones: string[];
  mapUrl?: string;
};

export type CityStores = {
  city: string;
  stores: Store[];
};

export const storeContact = {
  email: "info@fiam.com.pk",
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
        mapUrl:
          "https://www.google.com/maps/place/Crystal+Lights/@30.2090469,71.4680721,18z/data=!4m10!1m2!2m1!1sCrystal+Lights,+Chungi+%239,+Near+Food+Street+and+Khana+Farhang+Iran,+Khanewal+Road,+Multan,+Pakistan!3m6!1s0x393b33f11243f78b:0x4af2d3cdd679f7c9!8m2!3d30.2090469!4d71.4693596!15sCmNDcnlzdGFsIExpZ2h0cywgQ2h1bmdpICM5LCBOZWFyIEZvb2QgU3RyZWV0IGFuZCBLaGFuYSBGYXJoYW5nIElyYW4sIEtoYW5ld2FsIFJvYWQsIE11bHRhbiwgUGFraXN0YW6SARFlbGVjdHJvbmljc19zdG9yZeABAA!16s%2Fg%2F11gfnh2_l1?entry=ttu",
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
        address: "Phase 3 Chowk, near Bab-e-Peshawar flyover, Jamrud Road, Peshawar",
        phones: ["091-5612209", "0346-9187267", "0345-9445601"],
        mapUrl:
          "https://www.google.com/maps/search/?api=1&query=Light%20Palace%2C%20Phase%203%20Chowk%2C%20near%20Bab-e-Peshawar%20flyover%2C%20Jamrud%20Road%2C%20Peshawar%2C%20Pakistan",
      },
      {
        name: "Bright Basics",
        address: "Phase 3 Chowk, Al-Haaj Tower, Jamrud Road, Peshawar",
        phones: ["0345-9445601"],
      },
      {
        name: "Lighting Solution",
        address: "Phase 3 Chowk, Hayatabad, near Shahab Orthopedic Hospital, Jamrud Road, Peshawar",
        phones: ["091-5612209", "0333-9193533"],
        mapUrl:
          "https://www.google.com/maps/place/Lighting+Solution/@33.9840816,71.4458214,16z/data=!4m10!1m2!2m1!1sLighting+Solution,+Phase+3+Chowk,+Hayatabad,+near+Shahab+Orthopedic+Hospital,+Jamrud+Road,+Peshawar,+Pakistan!3m6!1s0x38d9119849fbaab5:0x1f9bed208fec9197!8m2!3d33.9840816!4d71.4553486!15sCndMaWdodGluZyBTb2x1dGlvbiwgUGhhc2UgMyBDaG93aywgSGF5YXRhYmFkLCBuZWFyIFNoYWhhYiBPcnRob3BlZGljIEhvc3BpdGFsLCBKYW1ydWQgUm9hZCwgUGVzaGF3YXIsIFBlc2hhd2FyLCBQYWtpc3RhblpyInBsaWdodGluZyBzb2x1dGlvbiBwaGFzZSAzIGNob3drIGhheWF0YWJhZCBuZWFyIHNoYWhhYiBvcnRob3BlZGljIGhvc3BpdGFsIGphbXJ1ZCByb2FkIHBlc2hhd2FyIHBlc2hhd2FyIHBha2lzdGFukgEObGlnaHRpbmdfc3RvcmXgAQA!16s%2Fg%2F11tgfvyf7b?entry=ttu",
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
        mapUrl:
          "https://www.google.com/maps/place/Rawal+Lights/@33.6564105,73.0783009,17z/data=!4m10!1m2!2m1!1sRawal+Lights,+Al-Harmain+Plaza,+Shop+2,+Murree+Rd,+Faizabad,+Shamsabad,+Rawalpindi,+Pakistan!3m6!1s0x38df951b15367f73:0xe1ae384bf6279b5e!8m2!3d33.6564105!4d73.0830645!15sClxSYXdhbCBMaWdodHMsIEFsLUhhcm1haW4gUGxhemEsIFNob3AgMiwgTXVycmVlIFJkLCBGYWl6YWJhZCwgU2hhbXNhYmFkLCBSYXdhbHBpbmRpLCBQYWtpc3RhblpXIlVyYXdhbCBsaWdodHMgYWwgaGFybWFpbiBwbGF6YSBzaG9wIDIgbXVycmVlIHJkIGZhaXphYmFkIHNoYW1zYWJhZCByYXdhbHBpbmRpIHBha2lzdGFukgEObGlnaHRpbmdfc3RvcmXgAQA!16s%2Fg%2F11spwl08d2?entry=ttu",
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
