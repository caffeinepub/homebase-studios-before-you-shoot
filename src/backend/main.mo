actor {
  public type ContactInformation = {
    address : Text;
    phone : Text;
    mail : Text;
  };

  public type BookingInformation = {
    text : Text;
  };

  let contactInfo : ContactInformation = {
    address = "Musik und Tonstudio, Jizerska 2/3A, Prag 8";
    phone = "+49 178 5542644";
    mail = "homebase.studios123@gmail.com";
  };

  let bookingInfo : BookingInformation = {
    text = "Contact us for music production, mixing, mastering, or rehearsal space bookings. Please note that we cannot offer the studio entirely for free. Contribution-based bookings are available for music production or rental needs. If you're seeking a rehearsal space, we've got you covered—just let us know. For personal or corporate events, let us know what you need, and we'll work something out (e.g., birthday parties, bachelor parties, company parties).";
  };

  public query ({ caller }) func getContactInformation() : async ContactInformation {
    contactInfo;
  };

  public query ({ caller }) func getBookingInformation() : async BookingInformation {
    bookingInfo;
  };
};
