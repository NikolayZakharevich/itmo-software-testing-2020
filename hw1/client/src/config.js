const configs = {
    new: {
        "api_basepath": 'http://127.0.0.1:8000/'
    },
    old: {
        "api_basepath": 'http://127.0.0.1:8001/api/v1/'
    }
};

const returnConfig = configs[process.env.REACT_APP_CONFIG] || configs.new;

export default returnConfig;
