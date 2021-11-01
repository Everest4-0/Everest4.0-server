
module.exports = ({ sequelize, Sequelize, defaultKeys }) => {

  const ACL = sequelize.define("acl", {
    ...defaultKeys,
    name: {
      type: Sequelize.STRING,
      unique: true
    },
    recourses: {
      type: Sequelize.STRING,
    },
    methods: {
      type: Sequelize.STRING,
      get() {
        return this.getDataValue('methods').split(';')
      },
      set(val) {
        this.setDataValue('methods', val.join(';'));
      },
    },
    allow: {
      type: Sequelize.BOOLEAN,
      defoult: true
    },
    generalAcess: {
      type: Sequelize.BOOLEAN,
      defoult: false
    },
  });

  return ACL;
};