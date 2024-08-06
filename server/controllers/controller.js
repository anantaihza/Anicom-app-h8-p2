class Controller {
  static home(req, res) {
    res.status(200).json({
      message: "Welcome to AnimeCom"
    })
  }
}

module.exports = Controller;
