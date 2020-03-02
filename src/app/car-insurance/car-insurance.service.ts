import { Injectable } from "@angular/core";
import { Brand } from "./brand.model";

@Injectable()
export class CarInsuranceService {
  brands: Brand[] = [
    
      { id: 351, title: "Alfa RomioJullita" },
      { id: 352, title: "Alfa RomioMeto" },
      { id: 353, title: "AudiA1" },
      { id: 354, title: "AudiA3" },
      { id: 355, title: "AudiA4" },
      { id: 356, title: "AudiA4HL" },
      { id: 357, title: "AudiA5" },
      { id: 358, title: "AudiA6" },
      { id: 359, title: "AudiA7" },
      { id: 360, title: "AudiQ3" },
      { id: 361, title: "AudiQ5" },
      { id: 362, title: "AudiQ7" },
      { id: 363, title: "BMW116" },
      { id: 364, title: "BMW118" },
      { id: 365, title: "BMW118i" },
      { id: 366, title: "BMW120I" },
      { id: 367, title: "BMW218" },
      { id: 368, title: "BMW218I" },
      { id: 369, title: "BMW316" },
      { id: 370, title: "BMW316I" },
      { id: 371, title: "BMW318" },
      { id: 372, title: "BMW320" },
      { id: 373, title: "BMW320i" },
      { id: 374, title: "BMW325" },
      { id: 375, title: "BMW328" },
      { id: 376, title: "BMW330" },
      { id: 377, title: "BMW330i" },
      { id: 378, title: "BMW335" },
      { id: 379, title: "BMW335 I" },
      { id: 380, title: "BMW340i" },
      { id: 381, title: "BMW350" },
      { id: 382, title: "BMW418" },
      { id: 383, title: "BMW418i" },
      { id: 384, title: "BMW520" },
      { id: 385, title: "BMW520i" },
      { id: 386, title: "BMW523i" },
      { id: 387, title: "BMW525i" },
      { id: 388, title: "BMW528" },
      { id: 389, title: "BMW530" },
      { id: 390, title: "BMW535" },
      { id: 391, title: "BMW740" },
      { id: 392, title: "BMW750IL" },
      { id: 393, title: "BMW760IL" },
      { id: 394, title: "BMWB.M.W 318 i" },
      { id: 395, title: "BMWB.M.W 520" },
      { id: 396, title: "BMWX1" },
      { id: 397, title: "BMWX1 I" },
      { id: 398, title: "BMWX3" },
      { id: 399, title: "BMWX4" },
      { id: 400, title: "BMWX5" },
      { id: 401, title: "BMWX6" },
      { id: 402, title: "BMW640i" },
      { id: 403, title: "BrillianceCross" },
      { id: 404, title: "BrillianceFRV" },
      { id: 405, title: "BrillianceFSV" },
      { id: 406, title: "BrillianceGalena" },
      { id: 407, title: "BrillianceSplendor" },
      { id: 408, title: "BrillianceV5" },
      { id: 409, title: "BYDF3" },
      { id: 410, title: "BYDF3GI" },
      { id: 411, title: "ChevroletAveo" },
      { id: 412, title: "ChevroletCaptiva" },
      { id: 413, title: "ChevroletCruze" },
      { id: 414, title: "ChevroletLanos" },
      { id: 415, title: "ChevroletOptra" },
      { id: 416, title: "ChevroletSpark" },
      { id: 417, title: "ChryslerC300" },
      { id: 418, title: "ChryslerM300" },
      { id: 419, title: "ChryslerTown&Country" },
      { id: 420, title: "CitroenC3" },
      { id: 421, title: "CitroenC4" },
      { id: 422, title: "CitroenC5" },
      { id: 423, title: "CitroenC-Elysee" },
      { id: 424, title: "CitroenDS3" },
      { id: 425, title: "CitroenDS4" },
      { id: 426, title: "CitroenDS5" },
      { id: 427, title: "CitroenGrandPicassoC4" },
      { id: 428, title: "CitroenpicassoC4" },
      { id: 429, title: "DaewooLanos" },
      { id: 430, title: "DaewooLeganza" },
      { id: 431, title: "DaewooNubira" },
      { id: 432, title: "DaihatsuCharade" },
      { id: 433, title: "DaihatsuGrandTerios" },
      { id: 434, title: "DaihatsuSirion" },
      { id: 435, title: "DaihatsuTerrios" },
      { id: 436, title: "DodgeDart" },
      { id: 437, title: "DodgeDurango" },
      { id: 438, title: "DodgeRAM" },
      { id: 439, title: "Fiat500X" },
      { id: 440, title: "FiatBrava" },
      { id: 441, title: "FiatPunto" },
      { id: 442, title: "FiatSiena" },
      { id: 443, title: "FiatTempra" },
      { id: 444, title: "FordFiesta" },
      { id: 445, title: "FordFocus" },
      { id: 446, title: "FordFocusTrend" },
      { id: 447, title: "Fordfusion" },
      { id: 448, title: "FordKuga" },
      { id: 449, title: "FordMonduo" },
      { id: 450, title: "HondaCity" },
      { id: 451, title: "HondaCivic" },
      { id: 452, title: "HondaCRV" },
      { id: 453, title: "HyundaiAccent" },
      { id: 454, title: "HyundaiAccentRB" },
      { id: 455, title: "HyundaiAtos" },
      { id: 456, title: "HyundaiCRETA" },
      { id: 457, title: "HyundaiElantra" },
      { id: 458, title: "HyundaiELANTRAHD" },
      { id: 459, title: "HyundaiGetz" },
      { id: 460, title: "HyundaiGrandI10" },
      { id: 461, title: "HyundaiI10" },
      { id: 462, title: "HyundaiI20" },
      { id: 463, title: "HyundaiI30" },
      { id: 464, title: "HyundaiIX20" },
      { id: 465, title: "HyundaiIX35" },
      { id: 466, title: "HyundaiMatrix" },
      { id: 467, title: "HyundaiNewAccent" },
      { id: 468, title: "HyundaiNewMatrix" },
      { id: 469, title: "HyundaiSantaFe" },
      { id: 470, title: "HyundaiSolaris" },
      { id: 471, title: "HyundaiSonata" },
      { id: 472, title: "HyundaiTucson" },
      { id: 473, title: "HyundaiVerna" },
      { id: 474, title: "HyundaiVernaViva" },
      { id: 475, title: "Hyundaiهيونداىفيلوستار" },
      { id: 476, title: "HyundaiTrcan" },
      { id: 477, title: "JaguarF. Type" },
      { id: 478, title: "JaguarRange" },
      { id: 479, title: "JaguarXE" },
      { id: 480, title: "JaguarXF" },
      { id: 481, title: "JaguarXJ" },
      { id: 482, title: "JeepCherokee" },
      { id: 483, title: "JeepCherokeeLimited" },
      { id: 484, title: "JeepGrandCherokee" },
      { id: 485, title: "Jeeplaredo" },
      { id: 486, title: "JeepRangler" },
      { id: 487, title: "JeepRenegade" },
      { id: 488, title: "CadilakCadillac" },
      { id: 489, title: "CadilakSRX4" },
      { id: 490, title: "KiaCarinz" },
      { id: 491, title: "KiaCarnaval" },
      { id: 492, title: "KiaCerato" },
      { id: 493, title: "KiaMohave" },
      { id: 494, title: "KiaPicanto" },
      { id: 495, title: "KiaPrideSaipa132" },
      { id: 496, title: "KiaRio" },
      { id: 497, title: "Kiaseed" },
      { id: 498, title: "KiaSorento" },
      { id: 499, title: "KiaSoul" },
      { id: 500, title: "KiaSportage" },
      { id: 501, title: "KomodoVLX" },
      { id: 502, title: "LadaGranta" },
      { id: 503, title: "Land roverDiscovery" },
      { id: 504, title: "Land roverLand rover" },
      { id: 505, title: "Land roverRangrover" },
      { id: 506, title: "Land roverEvoque" },
      { id: 507, title: "LexusRX350" },
      { id: 508, title: "MahindraScorpio" },
      { id: 509, title: "MaseratiMazarati" },
      { id: 510, title: "Mazda2" },
      { id: 511, title: "Mazda3" },
      { id: 512, title: "MazdaCore" },
      { id: 513, title: "MazdaFamilyHaima" },
      { id: 514, title: "MercedesA200" },
      { id: 515, title: "MercedesB150" },
      { id: 516, title: "MercedesB160" },
      { id: 517, title: "MercedesB180" },
      { id: 518, title: "MercedesB2 150" },
      { id: 519, title: "MercedesB200" },
      { id: 520, title: "MercedesC180" },
      { id: 521, title: "MercedesC200" },
      { id: 522, title: "MercedesC200K" },
      { id: 523, title: "MercedesC240" },
      { id: 524, title: "MercedesC250" },
      { id: 525, title: "MercedesC280" },
      { id: 526, title: "MercedesC300" },
      { id: 527, title: "MercedesC350" },
      { id: 528, title: "MercedesCLA180" },
      { id: 529, title: "MercedesCLA200" },
      { id: 530, title: "MercedesCLAEX" },
      { id: 531, title: "MercedesE180" },
      { id: 532, title: "MercedesE200" },
      { id: 533, title: "MercedesE230" },
      { id: 534, title: "MercedesE240" },
      { id: 535, title: "MercedesE250" },
      { id: 536, title: "MercedesE280" },
      { id: 537, title: "MercedesE300" },
      { id: 538, title: "MercedesE320" },
      { id: 539, title: "MercedesE350" },
      { id: 540, title: "MercedesGL500" },
      { id: 541, title: "MercedesGLA200" },
      { id: 542, title: "MercedesGLK 300" },
      { id: 543, title: "MercedesGLK350" },
      { id: 544, title: "MercedesmercedesGLK250" },
      { id: 545, title: "MercedesS320" },
      { id: 546, title: "MercedesS350L" },
      { id: 547, title: "MercedesS400" },
      { id: 548, title: "MercedesS500" },
      { id: 549, title: "MercedesS500L" },
      { id: 550, title: "MercedesCLC160" },
      { id: 551, title: "Mini cooperMini Cooper" },
      { id: 552, title: "Mini cooperCountry Man" },
      { id: 553, title: "Mini cooperCountry Man" },
      { id: 554, title: "MitsubishiAttrage" },
      { id: 555, title: "MitsubishiLancer" },
      { id: 556, title: "MitsubishiLancerSport" },
      { id: 557, title: "MitsubishiOutlander" },
      { id: 558, title: "MitsubishiPajero" },
      { id: 559, title: "NissanArmada" },
      { id: 560, title: "NissanCivilian" },
      { id: 561, title: "NissanInfinity" },
      { id: 562, title: "NissanJuke" },
      { id: 563, title: "NissanLivina" },
      { id: 564, title: "NissanPathfinder" },
      { id: 565, title: "NissanPatrol" },
      { id: 566, title: "NissanQashqai" },
      { id: 567, title: "NissanSentra" },
      { id: 568, title: "NissanSilvy" },
      { id: 569, title: "NissanSunny" },
      { id: 570, title: "NissanTida" },
      { id: 571, title: "NissanXterra" },
      { id: 572, title: "NissanX-Trail" },
      { id: 573, title: "OpelAstra" },
      { id: 574, title: "OpelِAstraCosmo" },
      { id: 575, title: "OpelCascada" },
      { id: 576, title: "OpelCorsa" },
      { id: 577, title: "OpelElegance" },
      { id: 578, title: "OpelInsignia" },
      { id: 579, title: "OpelMeriva" },
      { id: 580, title: "OpelMokka" },
      { id: 581, title: "OpelVectra" },
      { id: 582, title: "peroduaKelisa" },
      { id: 583, title: "Peugeot2008" },
      { id: 584, title: "Peugeot207" },
      { id: 585, title: "Peugeot208" },
      { id: 586, title: "Peugeot3008" },
      { id: 587, title: "Peugeot301" },
      { id: 588, title: "Peugeot307" },
      { id: 589, title: "Peugeot308" },
      { id: 590, title: "Peugeot405" },
      { id: 591, title: "Peugeot406" },
      { id: 592, title: "Peugeot407" },
      { id: 593, title: "Peugeot408" },
      { id: 594, title: "Peugeot5008" },
      { id: 595, title: "Peugeot505" },
      { id: 596, title: "Peugeot508" },
      { id: 597, title: "Peugeot508H/L" },
      { id: 598, title: "PeugeotRCZ" },
      { id: 599, title: "PorscheCarrera" },
      { id: 600, title: "PorscheCayan" },
      { id: 601, title: "PorscheMacan" },
      { id: 602, title: "ProtonGen2" },
      { id: 603, title: "ProtonPersona" },
      { id: 604, title: "ProtonSaga" },
      { id: 605, title: "RenaultCapture" },
      { id: 606, title: "RenaultClio" },
      { id: 607, title: "RenaultDuster" },
      { id: 608, title: "RenaultFluence" },
      { id: 609, title: "Renaultkadjar" },
      { id: 610, title: "RenaultLodgy" },
      { id: 611, title: "RenaultLogan" },
      { id: 612, title: "RenaultMegan" },
      { id: 613, title: "RenaultSandero" },
      { id: 614, title: "RenaultSanic" },
      { id: 615, title: "RenaultSymbol" },
      { id: 616, title: "RenaultSanderoStepWay" },
      { id: 617, title: "Sang yongTivoli" },
      { id: 618, title: "SeatAltea" },
      { id: 619, title: "SeatCordoba" },
      { id: 620, title: "SeatIbiza" },
      { id: 621, title: "SeatLeon" },
      { id: 622, title: "SeatToledo" },
      { id: 623, title: "SeatAteca" },
      { id: 624, title: "SkodaA5" },
      { id: 625, title: "SkodaA7HighLine" },
      { id: 626, title: "SkodaFabia" },
      { id: 627, title: "SkodaFabiaCombi" },
      { id: 628, title: "SkodaFantazia" },
      { id: 629, title: "SkodaOctavia" },
      { id: 630, title: "SkodaOctaviaA4" },
      { id: 631, title: "SkodaOctaviaA5Combi" },
      { id: 632, title: "SkodaOctaviaA5Elegance" },
      { id: 633, title: "SkodaOctaviaA7" },
      { id: 634, title: "SkodaOctaviaCombi" },
      { id: 635, title: "SkodaRapid" },
      { id: 636, title: "SkodaSuperb" },
      { id: 637, title: "SkodaYeti" },
      { id: 638, title: "CherryA113" },
      { id: 639, title: "CherryA213" },
      { id: 640, title: "CherryA516" },
      { id: 641, title: "CherryA620" },
      { id: 642, title: "CherryM11" },
      { id: 643, title: "CherryTiggo" },
      { id: 644, title: "CherryEnvy" },
      { id: 645, title: "SperanzaA113" },
      { id: 646, title: "SperanzaA213" },
      { id: 647, title: "SperanzaA516" },
      { id: 648, title: "SperanzaA620" },
      { id: 649, title: "SperanzaM11" },
      { id: 650, title: "SperanzaTiggo" },
      { id: 651, title: "SperanzaEnvy" },
      { id: 652, title: "SubaruForster" },
      { id: 653, title: "SubaruImperza" },
      { id: 654, title: "SubaruXV" },
      { id: 655, title: "SuzukiAlto" },
      { id: 656, title: "SuzukiCelerio" },
      { id: 657, title: "SuzukiCiaz" },
      { id: 658, title: "SuzukiGemini" },
      { id: 659, title: "SuzukiGrandVitara" },
      { id: 660, title: "SuzukiMaruti" },
      { id: 661, title: "SuzukiOrtega" },
      { id: 662, title: "SuzukiSwift" },
      { id: 663, title: "SuzukiSX4" },
      { id: 664, title: "SuzukiVitara" },
      { id: 665, title: "ToyotaAuris" },
      { id: 666, title: "ToyotaAvanza" },
      { id: 667, title: "ToyotaAvensis" },
      { id: 668, title: "ToyotaCamry" },
      { id: 669, title: "ToyotaCorolla" },
      { id: 670, title: "ToyotaEcho" },
      { id: 671, title: "ToyotaFJCruiser" },
      { id: 672, title: "ToyotaFortuner" },
      { id: 673, title: "ToyotaLandCruiser" },
      { id: 674, title: "ToyotaPrado" },
      { id: 675, title: "ToyotaRav4" },
      { id: 676, title: "ToyotaYaris" },
      { id: 677, title: "VolkswagenCC" },
      { id: 678, title: "Volkswagengolf" },
      { id: 679, title: "VolkswagenJetta" },
      { id: 680, title: "VolkswagenParati" },
      { id: 681, title: "VolkswagenPassat" },
      { id: 682, title: "VolkswagenPointer" },
      { id: 683, title: "VolkswagenPolo" },
      { id: 684, title: "VolkswagenSuran" },
      { id: 685, title: "VolkswagenTiguan" },
      { id: 686, title: "VolkswagenTouareg" },
      { id: 687, title: "VolkswagenTouran" },
      { id: 688, title: "VolvoS60" },
      { id: 689, title: "VolvoS80" },
      { id: 690, title: "VolvoV40" },
      { id: 691, title: "VolvoV60" },
      { id: 692, title: "VolvoXC60" },
      { id: 693, title: "VolvoXC90" },
      { id: 694, title: "VolvoS90" },
      { id: 695, title: "GeelyPandino" },
      { id: 696, title: "GeelyGeely" },
      { id: 697, title: "GeelyM Grand 7" },
      { id: 698, title: "FiatTipo" },
      { id: 699, title: "ToyotaC-HR" },
      { id: 700, title: "MG350" }
    
  ];

  get Brands() {
      return this.brands;
  }
}
