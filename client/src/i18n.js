// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Traducciones
const resources = {
  en: {
    translation: {
      configuration: {
        systemConfiguration: "System Configuration",
      },
      login: {
        user: "User",
        password: "Password",
        login: "Login",
        register: "You don't have an account?",
        register1: "Register",
      },
      navbar: {
        home: "Home",
        groups: "Groups",
        contacts: "Contacts",
        messages: "Messages",
        stack: "Stack",
        sent: "Sent",
        received: "Received",
        settings: "Settings",
        logout: "Logout",
      },
      main: {
        panelControl: " 's Control Panel",
        successVincMessage: "Your account is linked to WhatsApp",
        deniedVincMessage: "Your WhatsApp is not linked",
        contactGroup: "Contact Group",
        contactGroupDescription:
          "ABM of groups. Enter the groups here to assign recipients.",
        contact: "Contacts",
        contactDescription:
          "ABM of contacts. Enter the recipients of your system here.",
        message: "Messages",
        messageDescription:
          "ABM of messages. Here you can upload your immediate or scheduled messages.",
        queue: "Message Queue",
        queueDescription:
          "List of messages that are scheduled or have not yet been sent. You can edit them before sending.",
        sentMessages: "Sent Messages",
        sentMessagesDescription:
          "List of messages that have already been sent.",
        receivedMessages: "Received Messages",
        receivedMessagesDescription:
          "Here you can see the received messages (although you will also see them on the associated cell phone)",
        settings: "Settings",
        settingsDescription:
          "Edit your company data. And it will also be used to link WhatsApp®",
        autoReply: "Auto Replies",
        autoReplyDescription: "Define auto-replies according to triggers.",
        bots: "Bots",
        botsDescription: "Generate custom bots.",
        users: "Users",
        usersDescription: "System user control.",
        usersList: "User List",
        usersListDescription: "View list of registered users.",
        addUser: "Add User",
        addUserDescription: "Add a new user to the system.",
        userContacts: "User Contacts",
        userContactsDescription: "Contacts of the users.",
        userGroups: "User Groups",
        userGroupsDescription: "Contact Groups of the users.",
      },
      groupView: {
        group: "Group",
        description: "Description",
        actions: "Actions",
        addGroup: "Add Group",
        listGroup: "List Group",
      },
      contactsView: {
        name: "Name",
        wanumber: "WA Number",
        actions: "Actions",
        addContact: "Add Contact",
        order: "Order By",
        contactList: "Contact List",
        selectOrder: "Select Order",
      },
      messagesView: {
        text: "Text",
        to: "To",
        send: "Send",
        time: "Time",
        action: "Action",
        addMessage: "Add Message",
        messageList: "Message List",
      },
      queue: {
        text: "Text",
        to: "To",
        send: "Send",
        time: "Time",
        action: "Action",
        addMessage: "Add Message",
        queueList: "List of waiting messages",
      },
      send: {
        text: "Text",
        to: "To",
        send: "Send",
        result: "Result",
        action: "Action",
        addMessage: "Add Message",
        sentList: "List of sent messages",
        firstPage: "First Page",
        before: "Back",
        after: "Next",
        lastPage: "Last Page",
        page: "Page",
      },
      received: {
        n: "N",
        text: "Text",
        to: "To",
        from: "From",
        day: "Day",
        action: "Action",
        addMessage: "Add Message",
        receivedList: "List of received messages",
      },
      config: {
        bussiness: "Bussiness",
        slogan: "Slogan",
        action: "Action",
      },
      addMessage: {
        title: "Use these variables in the message",
        nb: "-NB- : Name of the contact",
        em: "-EM- : Name of the business",
        ems: "-EMS- : Slogan of the business"
      },
    },
  },
  es: {
    translation: {
      configuration: {
        systemConfiguration: "Configuracion del sistema",
      },
      login: {
        user: "Usuario",
        password: "Contraseña",
        login: "Ingresar",
        register: "No tienes cuenta? ",
        register1: "Registrate",
      },
      navbar: {
        home: "Inicio",
        groups: "Grupos",
        contacts: "Contactos",
        messages: "Mensajes",
        stack: "Cola",
        sent: "Enviados",
        received: "Recibidos",
        settings: "Configuración",
        logout: "Salir",
      },
      main: {
        panelControl: "Panel de control de",
        successVincMessage: "Su cuenta esta vinculada a WhatsApp",
        deniedVincMessage: "Aun no se ha vinculado su WhatsApp",
        contactGroup: "Grupo de contacto",
        contactGroupDescription:
          "ABM de grupos. Ingrese aqui los grupos para asignar destinatarios.",
        contact: "Contactos",
        contactDescription:
          "ABM de contactos. Ingrese aquí los destinatarios de su sistema.",
        message: "Mensajes",
        messageDescription:
          "ABM de mensajes. Aquí puede cargar sus mensajes inmediatos o programados.",
        queue: "Cola de mensajes",
        queueDescription:
          "Listado de mensajes que estén programados o aún no hayan sido enviados. Podrá editarlos antes de su envío.",
        sentMessages: "Mensajes Enviados",
        sentMessagesDescription:
          "Listado de mensajes que ya han sido enviados.",
        receivedMessages: "Recibidos",
        receivedMessagesDescription:
          "Aquí podrá ver los mensajes recibidos (aunque también los verá en celu asociado)",
        settings: "Configuración",
        settingsDescription:
          "Edite datos de su empresa. Y además se usará para vincular el WhatsApp®",
        autoReply: "Autorespuestas",
        autoReplyDescription: "Defina autorespuestas según disparador.",
        bots: "Bots",
        botsDescription: "Genere bots personalizados.",
        users: "Usuarios",
        usersDescription: "Control de usuarios del sistema.",
        usersList: "Listado de usuarios",
        usersListDescription: "Ver lista de usuarios registrados.",
        addUser: "Agregar Usuario",
        addUserDescription: "Agregar un nuevo usuario al sistema.",
        userContacts: "Contactos",
        userContactsDescription: "Contacto de los usuarios.",
        userGroups: "Grupos",
        userGroupsDescription: "Grupos de Contacto de los usuarios.",
      },
      groupView: {
        group: "Grupo",
        description: "Descripción",
        actions: "Acciones",
        addGroup: "Agregar Grupo",
        listGroup: "Listado de Grupos",
      },
      contactsView: {
        name: "name",
        wanumber: "Número de WA",
        actions: "Acción",
        addContact: "Agregar Contacto",
        order: "Ordenar por",
        contactList: "Lista de Contactos",
        selectOrder: "Seleccionar orden",
      },
      messagesView: {
        text: "Texto",
        to: "Para",
        send: "Enviar",
        time: "Hora",
        action: "Acción",
        addMessage: "Agregar Mensaje",
        messageList: "Lista de Mensajes",
      },
      queue: {
        text: "Texto",
        to: "Para",
        send: "Enviar",
        time: "Hora",
        action: "Acción",
        addMessage: "Agregar Mensaje",
        queueList: "Lista de Mensajes en espera",
      },
      send: {
        text: "Texto",
        to: "Para",
        send: "Enviar",
        result: "Resultado",
        time: "Hora",
        action: "Acción",
        addMessage: "Agregar Mensaje",
        sentList: "Listado de mensajes enviados",
        firstPage: "Primer Pagina",
        before: "Anterior",
        after: "Siguiente",
        lastPage: "Ultima Pagina",
        page: "Pagina",
      },
      received: {
        n: "N",
        text: "Texto",
        from: "De",
        send: "Enviar",
        day: "Dia",
        action: "Acción",
        addMessage: "Agregar Mensaje",
        receivedList: "Listado de mensajes recibidos",
      },
      config: {
        bussiness: "Negocio",
        slogan: "Eslogan",
        action: "Acción",
      },
      addMessage: {
        title: "Usa las siguiente variables en el mensaje",
        nb: "-NB- : Nombre del contacto",
        em: "-EM- : Nombre del negocio",
        ems: "-EMS- : Eslogan del negocio"
      },
    },
  },
};

i18n
  .use(initReactI18next) // Inicializa i18next con react-i18next
  .init({
    resources, // Recursos de traducción
    lng: "es", // Idioma inicial
    fallbackLng: "es", // Idioma por defecto si no se encuentra la traducción
    debug: true, // Activa mensajes de depuración en consola
    interpolation: {
      escapeValue: false, // React ya maneja la protección contra XSS
    },
  });

export default i18n;
