export const path = {
    HOME: "/",
    LOGIN: "login",
    REGISTER: "register",
    SYSTEM: "system",
    ADMIN: "admin",
    EMPLOYEE: "employee",
    USER: "user"
}

export const ROLES = {
    ADMIN: "R1",
    EMPLOYEE: "R2",
    USER: "R3"
}

export const ACTIONS = {
    CREATE: "CREATE",
    READ: "READ",
    UPDATE: "UPDATE",
    DELETE: "DELETE",   
};

export const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: state.isSelected ? 'red' : 'blue',
      padding: 20,
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
  
      return { ...provided, opacity, transition };
    }
  }