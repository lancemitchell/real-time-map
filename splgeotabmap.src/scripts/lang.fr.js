/* eslint-disable */
if (typeof window.splgeotabmap == "undefined") {
  window.splgeotabmap = {
    lang: {}
  };
}
window.splgeotabmap.lang.fr = {

  "reset_btn_desc":                     "Affichage affleurant de TOUTES les donn&eacute;es du capteur SpartanLync et rechargement",
  "reset_btn_title":                    "R&eacute;initialiser",
  "reset_btn_msg":                      "LES DONN&Eacute;ES DU CAPTEUR ONT &Eacute;T&Eacute; R&Eacute;INITIALIS&Eacute;ES",
  "reset_failed_busy":                  "Impossible de r&eacute;initialiser pendant qu&apos;une recherche de donn&eacute;es de capteur est en cours. Veuillez r&eacute;essayer plus tard.",

  "veh_comp_tractor":                   "Tracteur",
  "veh_comp_trailer1":                  "Bande annonce 1",
  "veh_comp_dolly":                     "Chariot",
  "veh_comp_trailer2":                  "Bande annonce 2",

  "sensors_not_found":                  "Aucun capteur trouv&eacute;",
  "sensors_tooltip_searching_msg":      "Recherche de capteurs SpartanLync ...",
  "sensors_tooltip_found_msg":          "Capteurs SpartanLync d&eacute;tect&eacute;s",
  "sensors_tooltip_found_menuitem_msg": "( Cliquez sur &apos;Afficher les capteurs SpartanLync&apos; pour plus de d&eacute;tails dans LE PANNEAU DE DROITE ===> )",
  "sensors_tooltip_not_found_msg":      "Capteurs SpartanLync introuvables",
  "sensors_tooltip_comp_found_msg":     "Sensores adicionales encontrados en",
  "sensors_menuitm_searching_msg":      "Recherche de [ <b>{veh}</b> ]<br />pour les capteurs Temptrac / TPMS ...<br />Veuillez attendre de voir les r&eacute;sultats de la recherche du capteur SpartanLync dans l&apos;info-bulle de la carte du v&eacute;hicule",
  "sensors_menuitm_not_Found_msg":      "Aucun capteur Temptrac / TPMS trouv&eacute; sur le v&eacute;hicule [ <b>{veh}</b> ]",

  "map_menuitm_label":                  "Afficher les capteurs SpartanLync",
  "map_menuitm_watchlist_add":          "Ajouter à la liste de surveillance SpartanLync",
  "map_menuitm_watchlist_remove":       "Supprimer de la liste de surveillance SpartanLync",
  "panel_btn_close_title":              "Fermer",
  "panel_title":                        "Capteurs SpartanLync pour:",
  "panel_sensor_timestamp":             "Horodatage du capteur",
  "panel_last_reading":                 "Derni&egrave;re lecture",
  "panel_switchto_spltools_instruction":"Afficher dans les outils SpartanLync",
  "panel_user_instruction":             "Survolez ou cliquez sur un v&eacute;hicule pour afficher les derni&egrave;res informations du capteur SpartanLync",
  "panel_search_busy_msg":              "OCCUP&Eacute;",
  "panel_veh_jump_widget_title":        "Aller au véhicule",

  "error_title":                        "Erreur",
  "error_app_title":                    "Erreur SplGeotabMap",
  "error_startup_general":              "&Eacute;CHEC de getSplSettings():",
  "error_failed_saving_watchlist":      "&Eacute;CHEC de saveWatchlist():",
  "error_startup_nosettings":           "Outils SpartanLync / Param&egrave;tres de carte non valides ou manquants",
  "error_startup_nosplmap":             "Configuration de la carte SpartanLync manquante.<br />Veuillez d&apos;abord lancer Spartanlync Map",
  "error_startup_nospltools":           "Configuration des outils SpartanLync manquante.<br />Veuillez d&apos;abord ex&eacute;cuter Spartanlync Tools",
  "error_spltools_switch_failed":       "&Eacute;chec du passage aux outils SpartanLync:",
  "error_spltools_switch_noprivsfound": "Erreur SplMap: votre compte MyGeotab ne dispose pas des autorisations suffisantes pour permettre le passage aux outils SpartanLync ... Veuillez ex&eacute;cuter les outils SpartanLync manuellement.",
  "error_spltools_switch_getnoprivs":   "Impossible d&apos;obtenir les autorisations MyGeotab pour passer aux outils SpartanLync:",

  "about_appname":                      "SpartanLync MyGeotab Map",
  "about_instruction":                  "Utilisez les outils SpartanLync pour modifier les param&egrave;tres ci-dessus",
  "about_timezone":                     "Date et heure Fuseau horaire",
  "about_refresh":                      "Taux de rafra&icirc;chissement des informations du capteur",
  "about_lang":                         "Langue",
  "about_buildver":                     "Version de construction",
  "about_builddate":                    "Date de construction",
  "about_unknown":                      "Inconnue",

  // Fault Alerts
  "alert_tooltip":                      "{alert_msg}<br />sur<br />{timestamp}",
  "alert_header":                       "Alerte post-allumage",
  "alert_sensor_location_header":       "Emplacement du capteur",
  "alert_missing_sensor":               "Capteur manquant",
  "alert_temperature_over":             "Surchauffe",
  "alert_temp_extreme_low":             "Température extrêmement basse",
  "alert_temp_extreme_high":            "Température extrêmement élevée",
  "leak_detected":                      "Fuite détectée",
  "alert_pressure_extreme_over":        "Surpression extrême",
  "alert_pressure_extreme_under":       "Extrême sous pression",
  "alert_pressure_over":                "Surpression",
  "alert_pressure_under":               "Sous pression",
  "alert_battery_low_voltage":          "La batterie du véhicule a une tension FAIBLE",
  "alert_tire_temperature_fault":       "Erreur de température des pneus",
  "alert_tire_pressure_fault":          "Défaut de pression des pneus",
  "alert_desc_zone":                    "Zone",
  "alert_desc_axle":                    "Essieu",
  "alert_desc_tire":                    "Pneu",
  "alert_desc_tractor":                 "Tracteur",
  "alert_desc_trailer":                 "Bande annonce",
  "alert_desc_dolly":                   "Chariot",
  "alert_tooltip_instruction_msg":      "( Cliquez pour plus de détails sur LE PANNEAU CÔTÉ DROIT ===> )",
}