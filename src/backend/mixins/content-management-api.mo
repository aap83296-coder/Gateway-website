import Types "../types/content-management";
import ContentLib "../lib/content-management";
import List "mo:core/List";

mixin (
  portfolioItems : List.List<Types.PortfolioItem>,
  services : List.List<Types.Service>,
  contactMessages : List.List<Types.ContactMessage>,
  state : { var nextPortfolioId : Nat; var nextServiceId : Nat; var nextMessageId : Nat },
) {
  // --- Portfolio CRUD ---

  public func addPortfolioItem(
    title : Text,
    client : Text,
    year : Nat,
    category : Text,
    technologies : [Text],
    description : Text,
  ) : async Types.PortfolioItem {
    ContentLib.addPortfolioItem(portfolioItems, state, title, client, year, category, technologies, description);
  };

  public func updatePortfolioItem(
    id : Nat,
    title : Text,
    client : Text,
    year : Nat,
    category : Text,
    technologies : [Text],
    description : Text,
  ) : async Bool {
    ContentLib.updatePortfolioItem(portfolioItems, id, title, client, year, category, technologies, description);
  };

  public func deletePortfolioItem(id : Nat) : async Bool {
    ContentLib.deletePortfolioItem(portfolioItems, id);
  };

  public query func listPortfolioItems() : async [Types.PortfolioItem] {
    ContentLib.listPortfolioItems(portfolioItems);
  };

  // --- Services CRUD ---

  public func addService(
    title : Text,
    description : Text,
    icon : Text,
    benefits : [Text],
  ) : async Types.Service {
    ContentLib.addService(services, state, title, description, icon, benefits);
  };

  public func updateService(
    id : Nat,
    title : Text,
    description : Text,
    icon : Text,
    benefits : [Text],
  ) : async Bool {
    ContentLib.updateService(services, id, title, description, icon, benefits);
  };

  public func deleteService(id : Nat) : async Bool {
    ContentLib.deleteService(services, id);
  };

  public query func listServices() : async [Types.Service] {
    ContentLib.listServices(services);
  };

  // --- Contact Messages ---

  public func submitContactMessage(
    name : Text,
    email : Text,
    phone : Text,
    subject : Text,
    message : Text,
  ) : async Types.ContactMessage {
    ContentLib.submitContactMessage(contactMessages, state, name, email, phone, subject, message);
  };

  public query func listContactMessages() : async [Types.ContactMessage] {
    ContentLib.listContactMessages(contactMessages);
  };

  // --- Admin Auth ---

  public query func checkAdminCredentials(username : Text, password : Text) : async Bool {
    ContentLib.checkAdminCredentials(username, password);
  };
}
