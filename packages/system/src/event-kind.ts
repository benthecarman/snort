enum EventKind {
  Unknown = -1,
  SetMetadata = 0,
  TextNote = 1,
  RecommendServer = 2,
  ContactList = 3, // NIP-02
  DirectMessage = 4, // NIP-04
  Deletion = 5, // NIP-09
  Repost = 6, // NIP-18
  Reaction = 7, // NIP-25
  BadgeAward = 8, // NIP-58
  SimpleChatMessage = 9, // NIP-29
  SealedRumor = 13, // NIP-59
  ChatRumor = 14, // NIP-24
  PublicChatChannel = 40, // NIP-28
  PublicChatMetadata = 41, // NIP-28
  PublicChatMessage = 42, // NIP-28
  PublicChatMuteMessage = 43, // NIP-28
  PublicChatMuteUser = 44, // NIP-28
  SnortSubscriptions = 1000, // NIP-XX
  Polls = 6969, // NIP-69
  GiftWrap = 1059, // NIP-59
  FileHeader = 1063, // NIP-94
  Relays = 10002, // NIP-65
  Ephemeral = 20_000,
  Auth = 22242, // NIP-42

  MuteList = 10_000, // NIP-51
  PinList = 10_001, // NIP-51

  CategorizedPeople = 30000, // NIP-51a
  CategorizedBookmarks = 30001, // NIP-51b

  TagLists = 30002, // NIP-51c
  Badge = 30009, // NIP-58
  ProfileBadges = 30008, // NIP-58

  LongFormTextNote = 30023, // NIP-23
  AppData = 30_078, // NIP-78
  LiveEvent = 30311, // NIP-102
  UserStatus = 30315, // NIP-38
  ZapstrTrack = 31337,
  SimpleChatMetadata = 39_000, // NIP-29
  ZapRequest = 9734, // NIP 57
  ZapReceipt = 9735, // NIP 57
  HttpAuthentication = 27235, // NIP 98 - HTTP Authentication
}

export default EventKind;
