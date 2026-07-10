import Types "../types/content-management";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  // --- Portfolio ---

  public func addPortfolioItem(
    items : List.List<Types.PortfolioItem>,
    state : { var nextPortfolioId : Nat },
    title : Text,
    client : Text,
    year : Nat,
    category : Text,
    technologies : [Text],
    description : Text,
  ) : Types.PortfolioItem {
    let id = state.nextPortfolioId;
    state.nextPortfolioId += 1;
    let item : Types.PortfolioItem = { id; title; client; year; category; technologies; description };
    items.add(item);
    item;
  };

  public func updatePortfolioItem(
    items : List.List<Types.PortfolioItem>,
    id : Nat,
    title : Text,
    client : Text,
    year : Nat,
    category : Text,
    technologies : [Text],
    description : Text,
  ) : Bool {
    var found = false;
    items.mapInPlace(
      func(item) {
        if (item.id == id) {
          found := true;
          { item with title; client; year; category; technologies; description };
        } else { item };
      }
    );
    found;
  };

  public func deletePortfolioItem(items : List.List<Types.PortfolioItem>, id : Nat) : Bool {
    let sizeBefore = items.size();
    items.retain(func(item) { item.id != id });
    items.size() < sizeBefore;
  };

  public func listPortfolioItems(items : List.List<Types.PortfolioItem>) : [Types.PortfolioItem] {
    items.toArray();
  };

  // --- Services ---

  public func addService(
    services : List.List<Types.Service>,
    state : { var nextServiceId : Nat },
    title : Text,
    description : Text,
    icon : Text,
    benefits : [Text],
  ) : Types.Service {
    let id = state.nextServiceId;
    state.nextServiceId += 1;
    let service : Types.Service = { id; title; description; icon; benefits };
    services.add(service);
    service;
  };

  public func updateService(
    services : List.List<Types.Service>,
    id : Nat,
    title : Text,
    description : Text,
    icon : Text,
    benefits : [Text],
  ) : Bool {
    var found = false;
    services.mapInPlace(
      func(svc) {
        if (svc.id == id) {
          found := true;
          { svc with title; description; icon; benefits };
        } else { svc };
      }
    );
    found;
  };

  public func deleteService(services : List.List<Types.Service>, id : Nat) : Bool {
    let sizeBefore = services.size();
    services.retain(func(svc) { svc.id != id });
    services.size() < sizeBefore;
  };

  public func listServices(services : List.List<Types.Service>) : [Types.Service] {
    services.toArray();
  };

  // --- Contact Messages ---

  public func submitContactMessage(
    messages : List.List<Types.ContactMessage>,
    state : { var nextMessageId : Nat },
    name : Text,
    email : Text,
    phone : Text,
    subject : Text,
    message : Text,
  ) : Types.ContactMessage {
    let id = state.nextMessageId;
    state.nextMessageId += 1;
    let msg : Types.ContactMessage = { id; name; email; phone; subject; message; timestamp = Time.now() };
    messages.add(msg);
    msg;
  };

  public func listContactMessages(messages : List.List<Types.ContactMessage>) : [Types.ContactMessage] {
    messages.toArray();
  };

  // --- Admin Auth ---

  public func checkAdminCredentials(username : Text, password : Text) : Bool {
    username == "admin" and password == "gsi2000";
  };
}
