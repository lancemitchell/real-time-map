/* eslint-disable */
if (typeof window.splmap == "undefined") {
  window.splmap = {
    lang: {}
  };
}
window.splmap.lang.fr = {

  "veh_comp_tractor":                              "Tracteur",
  "veh_comp_trailer1":                             "Bande annonce 1",
  "veh_comp_dolly":                                "Chariot",
  "veh_comp_trailer2":                             "Bande annonce 2",

  "sensor_search_busy_msg":                        "OCCUP&Eacute;",
  "sensor_search_busy_getting_data_msg":           "Obtenir des donn&eacute;es",
  "sensor_search_last_reading":                    "Derni&egrave;re lecture",
  "sensor_search_sensor_timestamp":                "Horodatage du capteur",
  "sensor_search_switchto_spltools_instruction":   "Voir dans SpartanLync Tools",
  "sensor_search_status_data_msg":                 "Donn&eacute;es d&apos;&eacute;tat",

  "splmap_rule_name_label":                        "Nom de la r&egrave;gle",
  "splmap_alert_header":                           "Alerte SpartanLync",
  "splmap_service_started":                        "Le service SpartanLync Map a d&eacute;marr&eacute; avec succ&egrave;s",
  "splmap_service_failed":                         "&Eacute;chec du d&eacute;marrage du service SpartanLync Map",
  "splmap_veh_flying_msg":                         "Voler au v&eacute;hicule<br />&apos;{veh}&apos;",
  "splmap_veh_flying_loading_gps":                 "Chargement des donn&eacute;es GPS du v&eacute;hicule",
  "splmap_veh_flying_loading_gps_subtitle":        "pour voler ...",
  "splmap_vehpanel_component_title":               "Composants du v&eacute;hicule",
  "splmap_vehpanel_splsensors_btn_tooltip":        "Afficher les donn&eacute;es du capteur SpartanLync pour ce v&eacute;hicule",

  "splmap_tooltip_map_add_veh_tofilter":           "Ajouter un appareil au filtre de v&eacute;hicule",
  "splmap_tooltip_vehtab_veh_flyto":               "Voler au v&eacute;hicule sur la carte",
  "splmap_tooltip_vehtab_veh_remove":              "Retirer ce v&eacute;hicule du panneau",
  "splmap_tooltip_vehtab_veh_hideshow":            "Masquer / Afficher le v&eacute;hicule sur la carte",
  "splmap_tooltip_vehtab_toggle_all":              "Toggle Tous les v&eacute;hicules / groupes",
  "splmap_tooltip_vehtab_delete_all":              "Supprimer tous les v&eacute;hicules / groupes du panneau",
  "splmap_tooltip_statustab_toggle_all":           "Basculer tous les statuts",
  "splmap_tooltip_statustab_delete_all":           "Supprimer tous les statuts",
  "splmap_tooltip_statustab_status_hideshow":      "Masquer / Afficher l&apos;&eacute;tat",
  "splmap_tooltip_statustab_status_remove":        "Supprimer ce statut",
  "splmap_tooltip_exceptiontab_exception_remove":  "Supprimer cette exception",
  "splmap_tooltip_exceptiontab_exception_hideshow":"Masquer / Afficher l&apos;exception",
  "splmap_tooltip_exceptiontab_toggle_all":        "Toggle Toutes les exceptions",
  "splmap_tooltip_exceptiontab_delete_all":        "Supprimer toutes les exceptions",
  "splmap_tooltip_configpanel_open":               "Ouvrir le panneau de configuration",
  "splmap_tooltip_configpanel_close":              "Fermer le panneau de configuration",
  "splmap_configpanel_search":                     "Chercher...",
  "splmap_configpanel_vehtab_title":               "V&eacute;hicules",
  "splmap_configpanel_vehtab_list_label":          "V&eacute;hicules s&eacute;lectionn&eacute;s",
  "splmap_configpanel_statustab_title":            "Statut",
  "splmap_configpanel_statustab_list_label":       "Statut s&eacute;lectionn&eacute;",
  "splmap_configpanel_exceptiontab_title":         "Des exceptions",
  "splmap_configpanel_exceptiontab_list_label":    "Exceptions s&eacute;lectionn&eacute;es",
  "splmap_controlspanel_label_live":               "VIVRE",
  "splmap_controlspanel_label_live_help":          "( Cliquez pour revenir au VIVRE )",
  "splmap_controlspanel_label_speed":              "La vitesse",
  "splmap_controlspanel_label_speed_tooltip":      "Menu de vitesse de lecture (la vitesse ne peut pas &ecirc;tre modifi&eacute;e en direct)",
  "splmap_controlspanel_label_date":               "Date",
  "splmap_controlspanel_label_time_start":         "Heure de d&eacute;but",
  "splmap_controlspanel_label_time_current":       "Heure actuelle",
  "splmap_controlspanel_label_apply_changes_btn":  "appliquer",
  "splmap_controlspanel_tooltip_play":             "Jouer",
  "splmap_controlspanel_tooltip_pause":            "Pause",
  "splmap_controlspanel_group":                    "Groupe",
  "splmap_map_zoom_in":                            "Agrandir",
  "splmap_map_zoom_out":                           "D&eacute;zoomer",

  "error_spltools_notfound":                       "Le SpartanLync Tools Add-In n&apos;a pas &eacute;t&eacute; trouv&eacute;. Veuillez installer et ex&eacute;cuter pour activer les fonctionnalit&eacute;s SpartanLync Temptrac / TPMS",
  "error_vehicle_cannot_fly":                      "D&eacute;sol&eacute;, impossible de voler vers ce v&eacute;hicule ... veuillez r&eacute;essayer dans quelques minutes",
  "error_vehicle_no_gps":                          "D&eacute;sol&eacute;, pas de donn&eacute;es GPS actuelles pour ce v&eacute;hicule.",
  "error_server_unavailable":                      "Le serveur n&apos;est pas disponible, veuillez r&eacute;essayer plus tard.",
  "error_not_enough_privs_to_switch":              "Erreur SplMap: votre compte MyGeotab ne dispose pas des autorisations suffisantes pour permettre le passage &agrave; SpartanLync Tools... Veuillez ex&eacute;cuter SpartanLync Tools manuellement.",
  "error_invalid_addin_array":                     "Tableau AddIn / customerPages non valide",
  "error_invalid_user":                            "Objet utilisateur manquant ou non valide",
  "error_systemsettings_missing_invalid":          "Objet SystemSettings manquant ou non valide",

  "datepicker_enter_to_apply_change":              "Dans Popup, appuyez sur ENTER pour appliquer votre changement d'heure",
  "datepicker_date_in_future":                     "La date s&eacute;lectionn&eacute;e est dans le futur!",
  "map_fetching_historical_data_inprogress":       "R&eacute;cup&eacute;ration des donn&eacute;es historiques",
  "map_fetching_historical_data_completed":        "Chargement des donn&eacute;es historiques termin&eacute;",

  "splgeotabmap_title":                            "Administrer SpartanLync pour l&apos;installation de MyGeotab Map",
  "splgeotabmap_init_msg":                         "V&eacute;rification de l&apos;&eacute;tat de l&apos;installation",
  "splgeotabmap_success_msg":                      "{op} SpartanLync {intofrom} MyGeotab Map avec succ&egrave;s",
  "splgeotabmap_install_btnlbl":                   "Installer pour tout le monde",
  "splgeotabmap_uninstall_btnlbl":                 "Supprimer pour tout le monde",
  "splgeotabmap_my_account_disable":               "Supprimer mon compte uniquement",
  "splgeotabmap_my_account_enable":                "Activer pour mon compte",
  "splgeotabmap_no_install_btnlbl":                "Impossible {op} pour tout le monde",
  "splgeotabmap_no_install_btnsublbl":             "Pas assez de privil&egrave;ges ... Veuillez demander au propri&eacute;taire / administrateur de votre base de donn&eacute;es d&apos;utiliser ce bouton",
  "splgeotabmap_addin_installed_msg":              "SpartanLync d&eacute;tect&eacute; comme install&eacute; dans MyGeotab Map",
  "splgeotabmap_addIn_notinstalled_msg":           "SpartanLync n&apos;est PAS install&eacute; dans MyGeotab Map",
  "splgeotabmap_failure_msg":                      "&Eacute;chec de {op} SpartanLync {tofrom} MyGeotab Map",
  "splgeotabmap_init_failure_msg":                 "&Eacute;chec de l&apos;initialisation de SpartanLync dans MyGeotab Map",
  "splgeotabmap_err_fetch_userdata_msg":           "Donn&eacute;es de compte utilisateur manquantes apr&egrave;s la r&eacute;cup&eacute;ration &agrave; partir de l&apos;API Geotab",
  "splgeotabmap_err_fetch_systemdata_msg":         "Donn&eacute;es de param&egrave;tres syst&egrave;me manquantes apr&egrave;s la r&eacute;cup&eacute;ration de l&apos;API Geotab",
  "splgeotabmap_feature_preview_enabled_foruser":  "SpartanLync dans MyGeotab Map est d&eacute;j&agrave; activ&eacute; pour [ {username} ]",
  "splgeotabmap_feature_preview_op_success_msg":   "{op} SpartanLync dans MyGeotab Map pour [ {username} ]",
  "splgeotabmap_feature_preview_op_failure_msg":   "&Eacute;chec de {op} SpartanLync dans MyGeotab Map pour l&apos;utilisateur [ {username} ]",
  "splgeotabmap_consent_install_msg":              "Obtenez des informations sur le capteur SpartanLync dans MyGeotab Map pour tous les utilisateurs de cette base de données en choisissant l'option d'installation suivante.",
  "splgeotabmap_consent_uninstall_msg":            "Vous pouvez supprimer SpartanLync de MyGeotab Map à tout moment à partir du menu Icône SpartanLync.",
  "splgeotabmap_consent_btn_label_install":        "Installer dans MyGeotab Map",
  "splgeotabmap_consent_btn_label_skip":           "Pas maintenant",

  "about_appname":                                 "SpartanLync Map",
  "about_instruction":                             "Utilisez les outils SpartanLync pour modifier les param&egrave;tres ci-dessus",
  "about_timezone":                                "Date et heure Fuseau horaire",
  "about_refresh":                                 "Taux de rafra&icirc;chissement des informations du capteur",
  "about_lang":                                    "Langue",
  "about_buildver":                                "Version de construction",
  "about_builddate":                               "Date de construction",
  "about_unknown":                                 "Inconnue",

  // Fault Alerts
  "alert_tooltip":                                 "{alert_msg}<br />sur<br />{timestamp}",
  "alert_header":                                  "Alerte post-allumage",
  "alert_sensor_location_header":                  "Emplacement du capteur",
  "alert_missing_sensor":                          "Capteur manquant",
  "alert_temperature_over":                        "Exceso de temperatura",
  "alert_pressure_extreme_over":                   "Surpression extrême",
  "alert_pressure_extreme_under":                  "Extrême sous pression",
  "alert_pressure_over":                           "Surpression",
  "alert_pressure_under":                          "Sous pression",
  "alert_battery_low_voltage":                     "La batterie du véhicule a une tension FAIBLE",
  "alert_tire_temperature_fault":                  "Erreur de température des pneus",
  "alert_tire_pressure_fault":                     "Défaut de pression des pneus",
  "alert_desc_zone":                               "Zone",
  "alert_desc_axle":                               "Essieu",
  "alert_desc_tire":                               "Pneu",
  "alert_desc_tractor":                            "Tracteur",
  "alert_desc_trailer":                            "Bande annonce",
  "alert_desc_dolly":                              "Chariot",
}