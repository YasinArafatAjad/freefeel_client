import { createContext } from "react";
import useLanguage from "../../hooks/useLanguage/useLanguage";

export const AddressContext = createContext(null);

const AddressProvider = ({ children }) => {
  const { language } = useLanguage();

  const engAddress = {
    Dhaka: [
      "ADABOR",
      "BADDA",
      "BANGSHAL",
      "BIMAN BANDAR",
      "BANANI",
      "CANTONMENT",
      "CHAK BAZAR",
      "DAKSHINKHAN",
      "DARUS SALAM",
      "DEMRA",
      "DHAMRAI",
      "DHANMONDI",
      "DOHAR",
      "BHASAN TEK",
      "BHATARA",
      "GENDARIA",
      "GULSHAN",
      "HAZARIBAGH",
      "JATRABARI",
      "KAFRUL",
      "KADAMTALI",
      "KALABAGAN",
      "KAMRANGIR CHAR",
      "KHILGAON",
      "KHILKHET",
      "KERANIGANJ",
      "KOTWALI",
      "LALBAGH",
      "MIRPUR",
      "MOHAMMADPUR",
      "MOTIJHEEL",
      "MUGDA",
      "NAWABGANJ",
      "NEW MARKET",
      "PALLABI",
      "PALTAN",
      "RAMNA",
      "RAMPURA",
      "SABUJBAGH",
      "RUPNAGAR",
      "SAVAR",
      "SHAHJAHANPUR",
      "SHAH ALI",
      "SHAHBAGH",
      "SHYAMPUR",
      "SHER-E-BANGLA NAGAR",
      "SUTRAPUR",
      "TEJGAON",
      "TEJGAON IND. AREA",
      "TURAG",
      "UTTARA PASCHIM",
      "UTTARA PURBA",
      "UTTARA DAKSHIN",
      "UTTAR KHAN",
      "WARI",
    ],

    FARIDPUR: [
      "ALFADANGA",
      "BHANGA",
      "BOALMARI",
      "CHAR BHADRASAN",
      "FARIDPUR SADAR",
      "MADHUKHALI",
      "NAGARKANDA",
      "SADARPUR",
      "SALTHA",
    ],

    GAZIPUR: ["GAZIPUR SADAR", "KALIAKAIR", "KALIGANJ", "KAPASIA", "SREEPUR"],

    GOPALGANJ: ["GOPALGANJ SADAR", "KASHIANI", "KOTALIPARA", "MUKSUDPUR", "TUNGIPARA"],

    KISHOREGONJ: ["BAKSHIGANJ", "DEWANGANJ", "ISLAMPUR", "JAMALPUR SADAR", "MADARGANJ", "MELANDAHA", "SARISHABARI"],

    MADARIPUR: ["KALKINI", "MADARIPUR SADAR", "RAJOIR", "SHIBCHAR", "DASAR"],

    MANIKGANJ: ["DAULATPUR", "GHIOR", "HARIRAMPUR", "MANIKGANJ SADAR", "SATURIA", "SHIBALAYA", "SINGAIR"],

    MUNSHIGANJ: ["GAZARIA", "LOHAJANG", "MUNSHIGANJ SADAR", "SERAJDIKHAN", "SREENAGAR", "TONGIBARI"],

    NARSINGDI: ["BELABO", "MANOHARDI", "NARSINGDI SADAR", "PALASH", "ROYPURA", "SHIBPUR"],

    NARAYANGANJ: ["ARAIHAZAR", "SONARGAON", "BANDAR", "NARAYANGANJ SADAR", "RUPGANJ"],

    RAJBARI: ["BALIAKANDI", "GOALANDA", "KALUKHALI", "PANGSHA", "RAJBARI SADAR"],

    SHARIATPUR: ["BHEDARGANJ", "DAMUDYA", "GOSAIRHAT", "NARIA", "SHARIATPUR SADAR", "ZANJIRA"],

    TANGAIL: [
      "BASAIL",
      "BHUAPUR",
      "DELDUAR",
      "DHANBARI",
      "GHATAIL",
      "GOPALPUR",
      "KALIHATI",
      "MADHUPUR",
      "MIRZAPUR",
      "NAGARPUR",
      "SAKHIPUR",
      "TANGAIL SADAR",
    ],

    KHULNA: [
      "BATIAGHATA",
      "DACOPE",
      "DAULATPUR",
      "DUMURIA",
      "DIGHALIA",
      "KHALISHPUR",
      "KHAN JAHAN ALI",
      "KHULNA SADAR",
      "KOYRA",
      "PAIKGACHHA",
      "PHULTALA",
      "RUPSA",
      "SONADANGA",
      "TEROKHADA",
    ],

    JHENAIDAH: ["HARINAKUNDA", "JHENAIDAH SADAR", "KALIGANJ", "KOTCHANDPUR", "MAHESHPUR", "SHAILKUPA"],

    KUSHTIA: ["BHERAMARA", "DAULATPUR", "KHOKSA", "KUMARKHALI", "KUSHTIA SADAR", "MIRPUR"],

    MAGURA: ["MAGURA SADAR", "MOHAMMADPUR", "SHALIKHA", "SREEPUR"],

    MEHERPUR: ["GANGNI", "MUJIB NAGAR", "MEHERPUR SADAR"],

    NARAIL: ["KALIA", "LOHAGARA", "NARAIL SADAR"],

    SATKHIRA: ["ASSASUNI", "DEBHATA", "KALAROA", "KALIGANJ", "SATKHIRA SADAR", "SHYAMNAGAR", "TALA"],

    CHUADANGA: ["ALAMDANGA", "CHUADANGA SADAR", "DAMURHUDA", "JIBAN NAGAR"],

    JESSORE: [
      "ABHAYNAGAR",
      "BAGHER PARA",
      "CHAUGACHHA",
      "JHIKARGACHHA",
      "KESHABPUR",
      "JESSORE SADAR",
      "MANIRAMPUR",
      "SHARSHA",
    ],

    BAGERHAT: [
      "BAGERHAT SADAR",
      "CHITALMARI",
      "FAKIRHAT",
      "KACHUA",
      "MOLLAHAT",
      "MONGLA",
      "MORRELGANJ",
      "RAMPAL",
      "SARANKHOLA",
    ],

    BARISAL: [
      "AGAILJHARA",
      "BABUGANJ",
      "BAKERGANJ",
      "BANARI PARA",
      "GAURNADI",
      "HIZLA",
      "BARISAL SADAR",
      "MHENDIGANJ",
      "MULADI",
      "WAZIRPUR",
      "KAZIRHUT",
    ],

    BARGUNA: ["AMTALI", "BAMNA", "BARGUNA SADAR", "BETAGI", "PATHARGHATA", "TALTALI"],

    BHOLA: ["BHOLA SADAR", "BURHANUDDIN", "CHAR FASSON", "DAULAT KHAN", "LALMOHAN", "MANPURA", "TAZUMUDDIN"],

    JHALOKATI: ["JHALOKATI SADAR", "KANTHALIA", "NALCHITY", "RAJAPUR"],

    PATUAKHALI: ["BAUPHAL", "DASHMINA", "DUMKI", "GALACHIPA", "KALAPARA", "MIRZAGANJ", "PATUAKHALI SADAR", "RANGABALI"],

    PIROJPUR: ["MATHBARIA", "BHANDARIA", "KAWKHALI", "NAZIRPUR", "PIROJPUR SADAR", "NESARABAD", "EINDURKANI"],

    RANGPUR: ["BADARGANJ", "GANGACHARA", "KAUNIA", "RANGPUR SADAR", "MITHA PUKUR", "PIRGACHHA", "PIRGANJ", "TARAGANJ"],

    DINAJPUR: [
      "BIRAMPUR",
      "BIRGANJ",
      "BIRAL",
      "BOCHAGANJ",
      "CHIRIRBANDAR",
      "FULBARI",
      "GHORAGHAT",
      "HAKIMPUR",
      "KAHAROLE",
      "KHANSAMA",
      "DINAJPUR SADAR",
      "NAWABGANJ",
      "PARBATIPUR",
    ],

    THAKURGAON: ["BALIADANGI", "HARIPUR", "PIRGANJ", "RANISANKAIL", "THAKURGAON SADAR"],

    GAIBANDHA: ["FULCHHARI", "GAIBANDHA SADAR", "GOBINDAGANJ", "PALASHBARI", "SADULLAPUR", "SAGHATA", "SUNDARGANJ"],

    LALMONIRHAT: ["ADITMARI", "HATIBANDHA", "KALIGANJ", "LALMONIRHAT SADAR", "PATGRAM"],

    KURIGRAM: [
      "BHURUNGAMARI",
      "CHAR RAJIBPUR",
      "CHILMARI",
      "PHULBARI",
      "KURIGRAM SADAR",
      "NAGESHWARI",
      "RAJARHAT",
      "RAUMARI",
      "ULIPUR",
    ],

    NILPHAMARI: ["DIMLA", "DOMAR", "JALDHAKA", "KISHOREGANJ", "NILPHAMARI SADAR", "SAIDPUR"],

    PANCHAGARH: ["ATWARI", "BODA", "DEBIGANJ", "PANCHAGARH SADAR", "TENTULIA"],

    CHITTAGONG: [
      "ANOWARA",
      "BAYEJID BOSTAMI",
      "BANSHKHALI",
      "BAKALIA",
      "BOALKHALI",
      "CHANDANAISH",
      "CHANDGAON",
      "CHITTAGONG PORT",
      "DOUBLE MOORING",
      "FATIKCHHARI",
      "HALISHAHAR",
      "HATHAZARI",
      "KOTWALI",
      "KHULSHI",
      "LOHAGARA",
      "MIRSHARAI",
      "PAHARTALI",
      "PANCHLAISH",
      "PATIYA",
      "PATENGA",
      "RANGUNIA",
      "RAOZAN",
      "SANDWIP",
      "SATKANIA",
      "SITAKUNDA",
    ],

    COMILLA: [
      "BARURA",
      "BRAHMAN PARA",
      "BURICHANG",
      "CHANDINA",
      "CHAUDDAGRAM",
      "COMILLA SADAR DAKSHIN",
      "DAUDKANDI",
      "DEBIDWAR",
      "HOMNA",
      "COMILLA SADAR",
      "LAKSAM",
      "MANOHARGANJ",
      "MEGHNA",
      "MURADNAGAR",
      "NANGALKOT",
      "TITAS",
    ],

    "COX'S BAZAR": ["CHAKARIA", "COX'S BAZAR SADAR", "KUTUBDIA", "MAHESHKHALI", "PEKUA", "RAMU", "TEKNAF", "UKHIA"],

    FENI: ["CHHAGALNAIYA", "DAGANBHUIYAN", "FENI SADAR", "FULGAZI", "PARSHURAM", "SONAGAZI"],

    KHAGRACHHARI: [
      "DIGHINALA",
      "KHAGRACHHARI SADAR",
      "LAKSHMICHHARI",
      "MAHALCHHARI",
      "MANIKCHHARI",
      "MATIRANGA",
      "PANCHHARI",
      "RAMGARH",
    ],

    LAKSHMIPUR: ["KAMALNAGAR", "LAKSHMIPUR SADAR", "ROYPUR", "RAMGANJ", "RAMGATI"],

    NOAKHALI: [
      "BEGUMGANJ",
      "CHATKHIL",
      "COMPANIGANJ",
      "HATIYA",
      "KABIRHAT",
      "SENBAGH",
      "SONAIMURI",
      "SUBARNACHAR",
      "NOAKHALI SADAR",
    ],

    RANGAMAT: [
      "BAGHAICHHARI",
      "BARKAL",
      "KAWKHALI",
      "BELAI CHHARI",
      "KAPTAI",
      "JURAI CHHARI",
      "LANGADU",
      "NANIARCHAR",
      "RAJASTHALI",
      "RANGAMATI SADAR",
    ],

    CHANDPUR: [
      "CHANDPUR SADAR",
      "FARIDGANJ",
      "HAIM CHAR",
      "HAJIGANJ",
      "KACHUA",
      "MATLAB DAKSHIN",
      "MATLAB UTTAR",
      "SHAHRASTI",
    ],

    BRAHMANBARIA: [
      "AKHAURA",
      "BANCHHARAMPUR",
      "BIJOYNAGAR",
      "BRAHMANBARIA SADAR",
      "ASHUGANJ",
      "KASBA",
      "NABINAGAR",
      "NASIRNAGAR",
      "SARAIL",
    ],

    BANDARBAN: ["ALIKADAM", "BANDARBAN SADAR", "LAMA", "NAIKHONGCHHARI", "ROWANGCHHARI", "RUMA", "THANCHI"],

    MYMENSINGH: [
      "BHALUKA",
      "DHOBAURA",
      "FULBARIA",
      "GAFFARGAON",
      "GAURIPUR",
      "HALUAGHAT",
      "ISHWARGANJ",
      "MYMENSINGH SADAR",
      "MUKTAGACHHA",
      "NANDAIL",
      "PHULPUR",
      "TARAKANDA",
      "TRISHAL",
    ],

    NETRAKONA: [
      "ATPARA",
      "BARHATTA",
      "DURGAPUR",
      "KHALIAJURI",
      "KALMAKANDA",
      "KENDUA",
      "MADAN",
      "MOHANGANJ",
      "NETROKONA SADAR",
      "PURBADHALA",
    ],

    SHERPUR: ["JHENAIGATI", "NAKLA", "NALITABARI", "SHERPUR SADAR", "SREEBARDI"],

    JAMALPUR: ["BAKSHIGANJ", "DEWANGANJ", "ISLAMPUR", "JAMALPUR SADAR", "MADARGANJ", "MELANDAHA", "SARISHABARI"],

    RAJSHAHI: [
      "BAGHA",
      "BAGHMARA",
      "BOALIA",
      "CHARGHAT",
      "DURGAPUR",
      "GODAGARI",
      "MATIHAR",
      "MOHANPUR",
      "PABA",
      "PUTHIA",
      "RAJPARA",
      "SHAH MAKHDUM",
      "TANORE",
    ],

    SIRAJGANJ: [
      "BELKUCHI",
      "CHAUHALI",
      "KAMARKHANDA",
      "KAZIPUR",
      "ROYGANJ",
      "SHAHJADPUR",
      "SIRAJGANJ SADAR",
      "TARASH",
      "ULLAH PARA",
    ],

    BOGRA: [
      "ADAMDIGHI",
      "BOGRA SADAR",
      "DHUNAT",
      "DHUPCHANCHIA",
      "GABTALI",
      "KAHALOO",
      "NANDIGRAM",
      "SARIAKANDI",
      "SHAJAHANPUR",
      "SHERPUR",
      "SHIBGANJ",
      "SONATOLA",
    ],

    JOYPURHAT: ["AKKELPUR", "JOYPURHAT SADAR", "KALAI", "KHETLAL", "PANCHBIBI"],

    NAOGAON: [
      "ATRAI",
      "BADALGACHHI",
      "DHAMOIRHAT",
      "MANDA",
      "MAHADEBPUR",
      "NAOGAON SADAR",
      "NIAMATPUR",
      "PATNITALA",
      "PORSHA",
      "RANINAGAR",
      "SAPAHAR",
    ],

    NATORE: ["BAGATIPARA", "BARAIGRAM", "GURUDASPUR", "LALPUR", "NATORE SADAR", "SINGRA"],

    "CHAPAI NABABGANJ": ["BHOLAHAT", "GOMASTAPUR", "NACHOLE", "CHAPAI NABABGANJ SADAR", "SHIBGANJ"],

    PABNA: ["ATGHARIA", "BERA", "BHANGURA", "CHATMOHAR", "FARIDPUR", "ISHWARDI", "PABNA SADAR", "SANTHIA"],

    SYLHET: [
      "BALAGANJ",
      "BEANI BAZAR",
      "BISHWANATH",
      "COMPANIGANJ",
      "DAKSHIN SURMA",
      "FENCHUGANJ",
      "GOLAPGANJ",
      "GOWAINGHAT",
      "JAINTIAPUR",
      "KANAIGHAT",
      "SYLHET SADAR",
      "ZAKIGANJ",
      "OSMANI",
    ],

    SUNAMGANJ: [
      "BISHWAMBARPUR",
      "CHHATAK",
      "DAKSHIN SUNAMGANJ",
      "DERAI",
      "DHARAMPASHA",
      "DOWARABAZAR",
      "JAGANNATHPUR",
      "JAMALGANJ",
      "SULLA",
      "SUNAMGANJ SADAR",
      "TAHIRPUR",
      "MADHYANAGAR",
    ],

    MAULVIBAZAR: ["BARLEKHA", "JURI", "KAMALGANJ", "KULAURA", "MAULVIBAZAR SADAR", "RAJNAGAR", "SREEMANGAL"],

    HABIGANJ: [
      "AJMIRIGANJ",
      "BAHUBAL",
      "BANIACHONG",
      "CHUNARUGHAT",
      "HABIGANJ SADAR",
      "LAKHAI",
      "MADHABPUR",
      "NABIGANJ",
      "HOBIGANJ",
      "SHAYESTAGANJ",
    ],
  };

  const banAddress = {
    ঢাকা: [
      "আদাবর",
      "বাড্ডা",
      "বংশাল",
      "বিমানবন্দর",
      "বনানী",
      "ক্যান্টনমেন্ট",
      "চকবাজার",
      "দক্ষিণখান",
      "দারুস সালাম",
      "ডেমরা",
      "ধামরাই",
      "ধানমণ্ডি",
      "দোহার",
      "ভাষানটেক",
      "ভাটারা",
      "গেন্ডারিয়া",
      "গুলশান",
      "হাজারীবাগ",
      "যাত্রাবাড়ী",
      "কাফরুল",
      "কদমতলী",
      "কলাবাগান",
      "কামরাঙ্গীরচর",
      "খিলগাঁও",
      "খিলক্ষেত",
      "কেরাণীগঞ্জ",
      "কোতয়ালী",
      "লালবাগ",
      "মিরপুর",
      "মোহাম্মদপুর",
      "মতিঝিল",
      "মুগদা",
      "নবাবগঞ্জ",
      "নিউমার্কেট",
      "পল্লবী",
      "পল্টন",
      "রমনা",
      "রামপুরা",
      "সবুজবাগ",
      "রূপনগর",
      "সাভার",
      "শাহজাহানপুর",
      "শাহআলী",
      "শাহবাগ",
      "শ্যামপুর",
      "শেরে-বাংলা নগর",
      "সূত্রাপুর",
      "তেজঁগাও",
      "তেজঁগাও শিল্পাঞ্চল",
      "তুরাগ",
      "উত্তারা পশ্চিম",
      "উত্তারা পূর্ব",
      "উত্তারা দক্ষিণ",
      "উত্তরখান",
      "ওয়ারী",
    ],

    ফরিদপুর: ["আলফাডাঙ্গা", "ভাঙ্গা", "বোয়ালমারী", "চরভদ্রাসন", "ফরিদপুর সদর", "মধুখালী", "নগরকান্দা", "সদরপুর", "সালথা"],

    গাজীপুর: ["গাজীপুর সদর", "কালিয়াকৈর", "কালীগঞ্জ", "কাপাসিয়া", "শ্রীপুর"],

    গোপালগঞ্জ: ["গোপালগঞ্জ সদর", "কাশিয়ানী", "কোটালীপাড়া", "মুকসুদপুর", "টুংগীপাড়া"],

    কিশোরগঞ্জ: ["বকশীগঞ্জ", "দেওয়ানগঞ্জ", "ইসলামপুর", "জামালপুর সদর", "মাদারগঞ্জ", "মেলান্দহ", "সরিষাবাড়ী"],

    মাদারীপুর: ["কালকিনি", "মাদারীপুর সদর", "রাজৈর", "শিবচর", "ডাসার"],

    মানিকগঞ্জ: ["দৌলতপুর", "ঘিওর", "হরিরামপুর", "মানিকগঞ্জ সদর", "সাটুরিয়া", "শিবালয়", "সিংগাইর"],

    মুন্সিগঞ্জ: ["গজারিয়া", "লৌহজং", "মুন্সিগঞ্জ সদর", "সিরাজদিখান", "শ্রীনগর", "টংগীবাড়ি"],

    নরসিংদী: ["বেলাবো", "মনোহরদী", "নরসিংদী সদর", "পলাশ", "রায়পুরা", "শিবপুর"],

    নারায়নগঞ্জ: ["আড়াইহাজার", "সোনারগাঁ", "বন্দর", "নারায়নগঞ্জ সদর", "রূপগঞ্জ"],

    রাজবাড়ী: ["বালিয়াকান্দি", "গোয়ালন্দ", "কালুখালী", "পাংশা", "রাজবাড়ী সদর"],

    শরীয়তপুর: ["ভেদরগঞ্জ", "ডামুড্যা", "গোসাইরহাট", "নড়িয়া", "শরিয়তপুর সদর", "জাজিরা"],

    টাঙ্গাইল: [
      "বাসাইল",
      "ভুয়াপুর",
      "দেলদুয়ার",
      "ধনবাড়ী",
      "ঘাটাইল",
      "গোপালপুর",
      "কালিহাতী",
      "মধুপুর",
      "মির্জাপুর",
      "নাগরপুর",
      "সখিপুর",
      "টাঙ্গাইল সদর",
    ],

    খুলনা: [
      "বটিয়াঘাটা",
      "দাকোপ",
      "দৌলতপুর",
      "ডুমুরিয়া",
      "দিঘলিয়া",
      "খালিশপুর",
      "খানজাহান আলী",
      "খুলনা সদর",
      "কয়রা",
      "পাইকগাছা",
      "ফুলতলা",
      "রূপসা",
      "সোনাডাঙ্গা",
      "তেরখাদা",
    ],

    ঝিনাইদহ: ["হরিণাকুন্ডু", "ঝিনাইদহ সদর", "কালীগঞ্জ", "কোটচাঁদপুর", "মহেশপুর", "শৈলকুপা"],

    কুষ্টিয়া: ["ভেড়ামারা", "দৌলতপুর", "খোকসা", "কুমারখালী", "কুষ্টিয়া সদর", "মিরপুর"],

    মাগুরা: ["মাগুরা সদর", "মহম্মদপুর", "শালিখা", "শ্রীপুর"],

    মেহেরপুর: ["গাংনী", "মুজিবনগর", "মেহেরপুর সদর"],

    নড়াইল: ["কালিয়া", "লোহাগড়া", "নড়াইল সদর"],

    সাতক্ষীরা: ["আশাশুনি", "দেবহাটা", "কলারোয়া", "কালিগঞ্জ", "সাতক্ষীরা সদর", "শ্যামনগর", "তালা"],

    চুয়াডাঙ্গা: ["আলমডাঙ্গা", "চুয়াডাঙ্গা সদর", "দামুড়হুদা", "জীবননগর"],

    যশোর: ["অভয়নগর", "বাঘারপাড়া", "চৌগাছা", "ঝিকরগাছা", "কেশবপুর", "যশোর সদর", "মণিরামপুর", "শার্শা"],

    বাগেরহাট: ["বাগেরহাট সদর", "চিতলমারী", "ফকিরহাট", "কচুয়া", "মোল্লাহাট", "মোংলা", "মোড়েলগঞ্জ", "রামপাল", "শরণখোলা"],

    বরিশাল: [
      "আগৈলঝাড়া",
      "বাবুগঞ্জ",
      "বাকেরগঞ্জ",
      "বানারীপাড়া",
      "গৌরনদী",
      "হিজলা",
      "বরিশাল সদর",
      "মেহেন্দিগঞ্জ",
      "মুলাদী",
      "উজিরপুর",
      "কাজীরহাট",
    ],

    বরগুনা: ["আমতলী", "বামনা", "বরগুনা সদর", "বেতাগী", "পাথরঘাটা", "তালতলি"],

    ভোলা: ["ভোলা সদর", "বোরহান উদ্দিন", "চরফ্যাশন", "দৌলতখান", "লালমোহন", "মনপুরা", "তজুমদ্দিন"],

    ঝালকাঠি: ["ঝালকাঠি সদর", "কাঠালিয়া", "নলছিটি", "রাজাপুর"],

    পটুয়াখালী: ["বাউফল", "দশমিনা", "দুমকি", "গলাচিপা", "কলাপাড়া", "মির্জাগঞ্জ", "পটুয়াখালী সদর", "রাঙ্গাবালী"],

    পিরোজপুর: ["মঠবাড়ীয়া", "ভান্ডারিয়া", "কাউখালী", "নাজিরপুর", "পিরোজপুর সদর", "নেছারাবাদ", "ইন্দুরকানী"],

    রংপুর: ["বদরগঞ্জ", "গংগাচড়া", "কাউনিয়া", "রংপুর সদর", "মিঠাপুকুর", "পীরগাছা", "পীরগঞ্জ", "তারাগঞ্জ"],

    দিনাজপুর: [
      "বিরামপুর",
      "বীরগঞ্জ",
      "বিরল",
      "বোচাগঞ্জ",
      "চিরিরবন্দর",
      "ফুলবাড়ী",
      "ঘোড়াঘাট",
      "হাকিমপুর",
      "কাহারোল",
      "খানসামা",
      "দিনাজপুর সদর",
      "নবাবগঞ্জ",
      "পার্বতীপুর",
    ],

    ঠাকুরগাঁও: ["বালিয়াডাঙ্গী", "হরিপুর", "পীরগঞ্জ", "রাণীশংকৈল", "ঠাকুরগাঁও সদর"],

    গাইবান্ধা: ["ফুলছড়ি", "গাইবান্ধা সদর", "গোবিন্দগঞ্জ", "পলাশবাড়ী", "সাদুল্লাপুর", "সাঘাটা", "সুন্দরগঞ্জ"],

    লালমনিরহাট: ["আদিতমারী", "হাতীবান্ধা", "কালীগঞ্জ", "লালমনিরহাট সদর", "পাটগ্রাম"],

    কুড়িগ্রাম: [
      "ভুরুঙ্গামারী",
      "চর রাজিবপুর",
      "চিলমারী",
      "ফুলবাড়ী",
      "কুড়িগ্রাম সদর",
      "নাগেশ্বরী",
      "রাজারহাট",
      "রৌমারী",
      "উলিপুর",
    ],

    নীলফামারী: ["ডিমলা", "ডোমার", "জলঢাকা", "কিশোরগঞ্জ", "নীলফামারী সদর", "সৈয়দপুর"],

    পঞ্চগড়: ["আটোয়ারী", "বোদা", "দেবীগঞ্জ", "পঞ্চগড় সদর", "তেতুলিয়া"],

    চট্টগ্রাম: [
      "আনোয়ারা",
      "বায়েজিদ বোস্তামী",
      "বাঁশখালী",
      "বাকালিয়া",
      "বোয়ালখালী",
      "চন্দনাইশ",
      "চান্দগাঁও",
      "চট্টগ্রাম বন্দর",
      "ডবলমুরিং",
      "ফটিকছড়ি",
      "হালিশহর",
      "হাটহাজারী",
      "কোতোয়ালি",
      "খুলশি",
      "লোহাগাড়া",
      "মীরসরাই",
      "পাহাড়তলী",
      "পাঁচলাইশ",
      "পটিয়া",
      "পতেঙ্গা",
      "রাঙ্গুনিয়া",
      "রাউজান",
      "সন্দ্বীপ",
      "সাতকানিয়া",
      "সীতাকুন্ড",
    ],

    কুমিল্লা: [
      "বরুড়া",
      "ব্রাহ্মণপাড়া",
      "বুড়িচং",
      "চান্দিনা",
      "চৌদ্দগ্রাম",
      "কুমিল্লা সদর দক্ষিণ",
      "দাউদকান্দি",
      "দেবিদ্বার",
      "হোমনা",
      "কুমিল্লা সদর",
      "লাকসাম",
      "মুরাদনগর",
      "মেঘনা",
      "মুরাদনগর",
      "নাঙ্গলকোট",
      "তিতাস",
    ],

    কক্সবাজার: ["চকরিয়া", "কক্সবাজার সদর", "কুতুবদিয়া", "মহেশখালী", "পেকুয়া", "রামু", "টেকনাফ", "উখিয়া"],

    ফেনী: ["ছাগলনাইয়া", "দাগনভূঞা", "ফেনী সদর", "ফুলগাজী", "পরশুরাম", "সোনাগাজী"],

    খাগড়াছড়ি: ["দিঘীনালা", "খাগড়াছড়ি সদর", "লক্ষীছড়ি", "মহালছড়ি", "মানিকছড়ি", "মাটিরাঙ্গা", "পানছড়ি", "রামগড়"],

    লক্ষ্মীপুর: ["কমলনগর", "লক্ষ্মীপুর সদর", "রায়পুর", "রামগঞ্জ", "রামগতি"],

    নোয়াখালী: ["বেগমগঞ্জ", "চাটখিল", "কোম্পানীগঞ্জ", "হাতিয়া", "কবিরহাট", "সেনবাগ", "সোনাইমুড়ী", "সুবর্ণচর", "নোয়াখালী"],

    রাঙ্গামাটি: [
      "বাঘাইছড়ি",
      "বরকল",
      "কাউখালী",
      "বিলাইছড়ি",
      "কাপ্তাই",
      "জুরাছড়ি",
      "লংগদু",
      "নানিয়ারচর",
      "রাজস্থলী",
      "রাঙ্গামাটি সদর",
    ],

    চাঁদপুর: ["চাঁদপুর সদর", "ফরিদগঞ্জ", "হাইমচর", "হাজীগঞ্জ", "কচুয়া", "মতলব  দক্ষিণ", "মতলব  উত্তর", "শাহরাস্তি"],

    ব্রাহ্মণবাড়িয়া: [
      "আখাউড়া",
      "বাঞ্ছারামপুর",
      "বিজয়নগর",
      "ব্রাহ্মণবাড়িয়া সদর",
      "আশুগঞ্জ",
      "কসবা",
      "নবীনগর",
      "নাসিরনগর",
      "সরাইল",
    ],

    বান্দরবান: ["আলীকদম", "বান্দরবান সদর", "লামা", "নাইক্ষ্যংছড়ি", "রোয়াংছড়ি", "রুমা", "থানচি"],

    ময়মনসিংহ: [
      "ভালুকা",
      "ধোবাউড়া",
      "ফুলবাড়ীয়া",
      "গফরগাঁও",
      "গৌরীপুর",
      "হালুয়াঘাট",
      "ঈশ্বরগঞ্জ",
      "ময়মনসিংহ সদর",
      "মুক্তাগাছা",
      "নান্দাইল",
      "ফুলপুর",
      "তারাকান্দা",
      "ত্রিশাল",
    ],

    নেত্রকোণা: [
      "আটপাড়া",
      "বারহাট্টা",
      "দুর্গাপুর",
      "খালিয়াজুরী",
      "কলমাকান্দা",
      "কেন্দুয়া",
      "মদন",
      "মোহনগঞ্জ",
      "নেত্রকোণা সদর",
      "পূর্বধলা",
    ],

    শেরপুর: ["ঝিনাইগাতী", "নকলা", "নালিতাবাড়ী", "শেরপুর সদর", "শ্রীবরদী"],

    জামালপুর: ["বকশীগঞ্জ", "দেওয়ানগঞ্জ", "ইসলামপুর", "জামালপুর সদর", "মাদারগঞ্জ", "মেলান্দহ", "সরিষাবাড়ী"],

    রাজশাহী: [
      "বাঘা",
      "বাগমারা",
      "বোয়ালিয়া",
      "চারঘাট",
      "দুর্গাপুর",
      "গোদাগাড়ী",
      "মতিহার",
      "মোহানপুর",
      "পবা",
      "পুঠিয়া",
      "রাজপাড়া",
      "শাহ মখদুম",
      "তানোর",
    ],

    সিরাজগঞ্জ: ["বেলকুচি", "চৌহালি", "কামারখন্দ", "কাজীপুর", "রায়গঞ্জ", "শাহজাদপুর", "সিরাজগঞ্জ সদর", "তাড়াশ", "উল্লাপাড়া"],

    বগুড়া: [
      "আদমদিঘি",
      "বগুড়া সদর",
      "ধুনট",
      "দুপচাচিঁয়া",
      "গাবতলী",
      "কাহালু",
      "নন্দিগ্রাম",
      "সারিয়াকান্দি",
      "শাজাহানপুর",
      "শেরপুর",
      "শিবগঞ্জ",
      "সোনাতলা",
    ],

    জয়পুরহাট: ["আক্কেলপুর", "জয়পুরহাট সদর", "কালাই", "ক্ষেতলাল", "পাঁচবিবি"],

    নওগাঁ: [
      "আত্রাই",
      "বদলগাছী",
      "ধামইরহাট",
      "মান্দা",
      "মহাদেবপুর",
      "নওগাঁ সদর",
      "নিয়ামতপুর",
      "পত্নিতলা",
      "পোরশা",
      "রাণীনগর",
      "সাপাহার",
    ],

    নাটোর: ["বাগাতিপাড়া", "বড়াইগ্রাম", "গুরুদাসপুর", "লালপুর", "নাটোর সদর", "সিংড়া"],

    চাঁপাইনবাবগঞ্জ: ["BHOLAHAT", "GOMASTAPUR", "NACHOLE", "CHAPAI NABABGANJ SADAR", "SHIBGANJ"],

    পাবনা: ["আটঘরিয়া", "বেড়া", "ভাঙ্গুড়া", "চাটমোহর", "ফরিদপুর", "ঈশ্বরদী", "পাবনা সদর", "সাঁথিয়া"],

    সিলেট: [
      "বালাগঞ্জ",
      "বিয়ানীবাজার",
      "বিশ্বনাথ",
      "কোম্পানীগঞ্জ",
      "দক্ষিণ সুরমা",
      "ফেঞ্চুগঞ্জ",
      "গোলাপগঞ্জ",
      "গোয়াইনঘাট",
      "জৈন্তাপুর",
      "কানাইঘাট",
      "সিলেট সদর",
      "জকিগঞ্জ",
      "ওসমানী",
    ],

    সুনামগঞ্জ: [
      "বিশ্বম্ভরপুর",
      "ছাতক",
      "দক্ষিণ সুনামগঞ্জ",
      "দিরাই",
      "ধর্মপাশা",
      "দোয়ারাবাজার",
      "জগন্নাথপুর",
      "জামালগঞ্জ",
      "শাল্লা",
      "সুনামগঞ্জ সদর",
      "তাহিরপুর",
      "মধ্যনগর",
    ],

    মৌলভীবাজার: ["বড়লেখা", "জুড়ী", "কমলগঞ্জ", "কুলাউড়া", "মৌলভীবাজার সদর", "রাজনগর", "শ্রীমঙ্গল"],

    হবিগঞ্জ: [
      "আজমিরীগঞ্জ",
      "বাহুবল",
      "বানিয়াচং",
      "চুনারুঘাট",
      "নবীগঞ্জ",
      "লাখাই",
      "মাধবপুর",
      "নবীগঞ্জ",
      "হবিগঞ্জ সদর",
      "শায়েস্তাগঞ্জ",
    ],
  };

  // Dynamically return the address based on language
  const info = language === "ban" ? banAddress : engAddress;

  return <AddressContext.Provider value={info}>{children}</AddressContext.Provider>;
};

export default AddressProvider;
