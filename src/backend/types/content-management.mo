module {
  public type PortfolioItem = {
    id : Nat;
    title : Text;
    client : Text;
    year : Nat;
    category : Text;
    technologies : [Text];
    description : Text;
  };

  public type Service = {
    id : Nat;
    title : Text;
    description : Text;
    icon : Text;
    benefits : [Text];
  };

  public type ContactMessage = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    subject : Text;
    message : Text;
    timestamp : Int;
  };
}
